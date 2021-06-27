import React from 'react';
import { GraphQLClient } from 'graphql-request';

import { isAuthenticated, getAccessToken } from '../Auth';

const API_ENDPOINT = '/api';

const fetcher = (query, variables) => {
  const graphQLClient = new GraphQLClient(API_ENDPOINT);
  if (isAuthenticated()) {
    const token = getAccessToken();
    graphQLClient.setHeader('authorization', token ? `Bearer ${token}` : '');
  }
  return graphQLClient.request(query, variables);
};

export const useMutation = (mutation) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState();
  const [data, setData] = React.useState();

  const doMutation = (variables) => {
    return new Promise((resolve, reject) => {
      setIsLoading(true);

      fetcher(mutation, variables)
        .then((data) => {
          setIsLoading(false);
          setData(data);
          resolve(data);
        })
        .catch((err) => {
          setIsLoading(false);
          setError(err);
          reject(err);
        });
    });
  };

  return [
    doMutation,
    {
      isLoading,
      error,
      data,
    },
  ];
};

export default fetcher;
