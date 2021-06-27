import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import useSWR from 'swr';
import { Redirect, useParams, useHistory } from 'next/link';
import { loader } from 'graphql.macro';
import { print } from 'graphql/language/printer';

import config from '../config';
import { useMutation } from '../graphql/fetcher';

import PageLayout from '../components/PageLayout';
import Container from '../components/Container';
import Spacer from '../components/Spacer';
import Text from '../components/Text';
import Button from '../components/Button';
import Notification from '../components/Notification';

const REMOVE_LOO_MUTATION = print(loader('../graphql/removeLoo.graphql'));
const GET_LOO_BY_ID_QUERY = print(loader('../graphql/findLooById.graphql'));

const RemovePage = function (props) {
  const [reason, setReason] = useState('');
  const params = useParams();
  const history = useHistory();

  const {
    isValidating: loadingLooData,
    data: looData,
    error: looError,
  } = useSWR([GET_LOO_BY_ID_QUERY, JSON.stringify({ id: params.id })]);

  const [
    doRemove,
    { loading: loadingRemove, error: removeError },
  ] = useMutation(REMOVE_LOO_MUTATION);

  const updateReason = (evt) => {
    setReason(evt.currentTarget.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    await doRemove({
      id: looData.loo.id,
      reason,
    });

    history.push(`/loos/${props.match.params.id}?message=removed`);
  };

  if (removeError || looError) {
    console.error(removeError || looError);
  }

  if (loadingLooData || !looData || looError) {
    return (
      <PageLayout>
        <Notification>
          {loadingLooData ? 'Fetching Toilet Data' : 'Error finding toilet.'}
        </Notification>
      </PageLayout>
    );
  }

  if (!looData.loo.active) {
    return <Redirect to="/" />;
  }

  return (
    <PageLayout layoutMode="blog">
      <Helmet>
        <title>{config.getTitle('Remove Toilet')}</title>
      </Helmet>

      <Container maxWidth={845}>
        <Text fontSize={6} fontWeight="bold" textAlign="center">
          <h1>Toilet Remover</h1>
        </Text>

        <Spacer mb={5} />

        <p>
          Please let us know why you're removing this toilet from the map using
          the form below.
        </p>

        <Spacer mb={3} />

        <form onSubmit={onSubmit}>
          <label>
            <b>Reason for removal</b>
            <textarea
              type="text"
              name="reason"
              value={reason}
              onChange={updateReason}
              required
              css={{
                height: '100px',
                width: '100%',
              }}
            />
          </label>

          <Spacer mb={3} />

          <Button type="submit">Remove</Button>
        </form>

        {loadingRemove && (
          <Notification>Submitting removal report&hellip;</Notification>
        )}

        {removeError && (
          <Notification>
            Oops. We can't submit your report at this time. Try again later.
          </Notification>
        )}
      </Container>
    </PageLayout>
  );
};

export default RemovePage;
