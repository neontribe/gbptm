import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link, Redirect } from 'next/link';
import merge from 'lodash/merge';
import cloneDeep from 'lodash/cloneDeep';
import uniqBy from 'lodash/uniqBy';
import { css } from '@emotion/core';
import useSWR, { mutate } from 'swr';
import { loader } from 'graphql.macro';
import { print } from 'graphql/language/printer';

import PageLayout from '../components/PageLayout';
import Button from '../components/Button';
import Spacer from '../components/Spacer';
import Notification from '../components/Notification';
import EntryForm from '../components/EntryForm';
import LooMap from '../components/LooMap';
import Box from '../components/Box';

import config from '../config';
import { useMutation } from '../graphql/fetcher';
import useNearbyLoos from '../components/useNearbyLoos';
import { useMapState } from '../components/MapState';

const FIND_LOO_BY_ID_QUERY = print(loader('../graphql/findLooById.graphql'));
const UPDATE_LOO_MUTATION = print(loader('../graphql/updateLoo.graphql'));

const EditPage = (props) => {
  const {
    isValidating: loadingLooData,
    data: looData,
    error: looError,
  } = useSWR(
    [FIND_LOO_BY_ID_QUERY, JSON.stringify({ id: props.match.params.id })],
    {
      revalidateOnFocus: false,
    }
  );

  const [mapState, setMapState] = useMapState();

  const looLocation = (looData && looData.loo.location) || null;

  // set the map position to the loo location
  React.useEffect(() => {
    if (looLocation) {
      setMapState({ center: looLocation });
    }
  }, [looLocation, setMapState]);

  const { data } = useNearbyLoos({
    lat: mapState.center.lat,
    lng: mapState.center.lng,
    radius: mapState.radius,
  });

  // local state mapCenter to get fix issues with react-leaflet not being stateless and lat lng rounding issues
  const [mapCenter, setMapCenter] = useState();

  const [initialData, setInitialData] = useState();

  useEffect(() => {
    if (!looData) {
      return;
    }

    const toilet = cloneDeep(merge({}, { active: null }, looData.loo));
    setMapCenter(toilet.location);

    // keep track of defaults so we only submit new information
    setInitialData({
      loo: toilet,
      center: {
        lat: toilet.location.lat,
        lng: toilet.location.lng,
      },
    });
  }, [looData]);

  const [
    updateLoo,
    { loading: saveLoading, data: saveData, error: saveError },
  ] = useMutation(UPDATE_LOO_MUTATION);

  const save = async (formData) => {
    formData.id = looData.loo.id;

    try {
      const data = await updateLoo(formData);

      // update cached query
      mutate(
        [
          FIND_LOO_BY_ID_QUERY,
          JSON.stringify({ id: data.submitReport.loo.id }),
        ],
        {
          loo: data.submitReport.loo,
        }
      );
    } catch (err) {
      console.error('save error', err);
    }
  };

  if (saveData) {
    // redirect to updated toilet entry page
    return (
      <Redirect to={`/loos/${saveData.submitReport.loo.id}?message=updated`} />
    );
  }

  if (loadingLooData || !looData || !initialData || looError) {
    return (
      <PageLayout>
        <Box
          my={4}
          mx="auto"
          css={css`
            max-width: 360px; /* fallback */
            max-width: fit-content;
          `}
        >
          <Notification>
            {looError ? 'Error fetching toilet data' : 'Fetching Toilet Data'}
          </Notification>
        </Box>
      </PageLayout>
    );
  }

  // redirect to index if loo is not active (i.e. removed)
  if (looData && !looData.loo.active) {
    return <Redirect to="/" />;
  }

  const getLoosToDisplay = () => {
    let activeLoo;

    if (looData) {
      activeLoo = {
        ...looData.loo,
        isHighlighted: true,
      };
    }

    // only return the active loos once (activeLoo must be first in array)
    return uniqBy([activeLoo, ...data], 'id').filter(Boolean);
  };

  return (
    <PageLayout>
      <Helmet>
        <title>{config.getTitle('Edit Toilet')}</title>
      </Helmet>

      <Box display="flex" height="40vh">
        <LooMap
          loos={getLoosToDisplay()}
          center={mapState.center}
          zoom={mapState.zoom}
          minZoom={config.editMinZoom}
          showCenter
          showContributor
          showLocateControl
          showCrosshair
          controlsOffset={20}
          withAccessibilityOverlays={false}
          onViewportChanged={(mapPosition) => {
            setMapCenter(mapPosition.center);
          }}
        />
      </Box>

      <Spacer mt={4} />

      <EntryForm
        title="Edit This Toilet"
        loo={initialData.loo}
        center={mapCenter}
        saveLoading={saveLoading}
        saveError={saveError}
        onSubmit={save}
      >
        {({ isDirty }) => (
          <Box display="flex" flexDirection="column" alignItems="center">
            <Button
              type="submit"
              disabled={!isDirty}
              css={{
                width: '100%',
              }}
              data-testid="update-toilet-button"
            >
              Update the toilet
            </Button>

            <Spacer mt={2} />

            <Button
              as={Link}
              to={`/loos/${props.match.params.id}/remove`}
              css={{
                width: '100%',
              }}
              data-testid="remove-toilet-button"
            >
              Remove the toilet
            </Button>
          </Box>
        )}
      </EntryForm>
    </PageLayout>
  );
};

export default EditPage;
