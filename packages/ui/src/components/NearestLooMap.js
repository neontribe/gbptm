import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import LooMap from './LooMap';
import WithApolloClient from './WithApolloClient';

import { useQuery, gql } from '@apollo/client';
import { loader } from 'graphql.macro';

import Notification from './Notification';
import config from '../config';

import styles from './css/loo-map.module.css';

const FIND_LOOS_NEARBY = loader('./findLoosNearby.graphql');

const NearestLooMap = function NearestLooMap(props) {
  const [geolocation, setGeolocation] = useState();
  const { apolloClient } = props;
  let looMap;

  const { mapControls } = apolloClient.readQuery({
    query: gql`
      query getMapControls {
        mapControls {
          zoom
          center {
            lat
            lng
          }
          highlight
        }
      }
    `,
  });

  let loo = props.loo;
  let looCentre;
  if (loo) {
    looCentre = {
      ...loo.location,
    };
  }

  // Return map to last stored position or default to user location
  const [mapCenter, setMapCenter] = useState(mapControls.center);

  // A helper function to fire events for the map leaflet
  const updateLoadingStatus = function updateLoadingStatus(isLoading) {
    if (!looMap) return;

    if (isLoading) {
      looMap.refs.map.leafletElement.fire('dataloading');
    } else {
      looMap.refs.map.leafletElement.fire('dataload');
    }
  };

  // Fetch the current geolocation on rerender
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      response => {
        const { longitude, latitude } = response.coords;
        setGeolocation({ lng: longitude, lat: latitude });
      },
      error => {
        setGeolocation({
          error: true,
        });
      }
    );
  }, []);

  // Fetch the nearby loos
  updateLoadingStatus(true);
  const { loading, data, refetch } = useQuery(FIND_LOOS_NEARBY, {
    variables: {
      ...mapCenter,
      radius: config.nearestRadius,
    },
    skip: !!props.overrideLoos, // this doesn't actually have any effect, Apollo bug
    onCompleted: data => {
      updateLoadingStatus(false);
    },
  });

  function onUpdateCenter({ lat, lng }) {
    if (props.onUpdateCenter) {
      props.onUpdateCenter({ lat, lng });
    }

    if (!loading) {
      updateLoadingStatus(true);
      refetch();
    }

    setMapCenter({ lat, lng });
    apolloClient.writeQuery({
      query: gql`
        query updateCenter {
          mapControls {
            center {
              lat
              lng
            }
          }
        }
      `,
      data: {
        mapControls: {
          center: {
            lat,
            lng,
          },
        },
      },
    });
  }

  function onUpdateZoom(zoom) {
    apolloClient.writeQuery({
      query: gql`
        query updateZoom {
          mapControls {
            zoom
          }
        }
      `,
      data: {
        mapControls: {
          zoom,
        },
      },
    });
  }

  const getInitialPosition = () => {
    // Work out what the best possible initial position is
    if (looCentre) {
      return looCentre;
    } else if (mapControls.center.lat !== 0 && mapControls.center.lng !== 0) {
      return mapControls.center;
    } else if (geolocation) {
      if (geolocation.error) {
        return config.fallbackLocation;
      } else {
        return geolocation;
      }
    } else {
      return null;
    }
  };

  return (
    <div className={styles.map}>
      {loading && (
        <div className={styles.loading}>Fetching toilets&hellip;</div>
      )}

      {getInitialPosition() ? (
        <LooMap
          wrappedComponentRef={it => (looMap = it)}
          loos={props.overrideLoos || (data ? data.loosByProximity : [])}
          countLimit={props.numberNearest ? 5 : 0}
          showcontributor={true}
          showLocation={true}
          showSearchControl={true}
          showLocateControl={true}
          showCenter={true}
          onZoom={onUpdateZoom}
          onUpdateCenter={onUpdateCenter}
          initialZoom={mapControls.zoom}
          initialPosition={getInitialPosition()}
          highlight={props.highlight || mapControls.highlight}
          {...props.mapProps}
        />
      ) : (
        <Notification>Finding your location&hellip;</Notification>
      )}
    </div>
  );
};

NearestLooMap.propTypes = {
  // A loo to focus
  loo: PropTypes.object,
  // props to spread (last) over the LooMap instance
  mapProps: PropTypes.object,
  // Whether to show an index on the nearest five loos
  numberNearest: PropTypes.bool,
  // An optional callback
  onUpdateCenter: PropTypes.func,
  // An optional list of loos to use instead of querying the server
  overrideLoos: PropTypes.array,
};

const NearestLooMapWithApolloClient = props => (
  <WithApolloClient>
    <NearestLooMap {...props} />
  </WithApolloClient>
);

export default NearestLooMapWithApolloClient;
