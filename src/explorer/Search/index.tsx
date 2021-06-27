import React from 'react';
import useSWR from 'swr';
import { useLocation, useHistory, useRouteMatch } from 'next/link';
import { parse, stringify } from 'query-string';
import { loader } from 'graphql.macro';
import { print } from 'graphql/language/printer';

import Results from './Results';
import SearchForm from './Form/SearchForm';

const SEARCH_QUERY = print(loader('./search.graphql'));

function useSearchVariables() {
  let { search } = useLocation();
  let query = parse(search, {
    parseNumbers: true,
    parseBooleans: true,
  });
  let defaults = {
    order: 'NEWEST_FIRST',
    page: 1,
    limit: 10,
  };

  return {
    ...defaults,
    ...query,
  };
}

export default function Search() {
  let history = useHistory();
  let { path } = useRouteMatch();
  let variables = useSearchVariables();

  const { isValidating: loading, data, error } = useSWR([
    SEARCH_QUERY,
    JSON.stringify(variables),
  ]);

  function search(params) {
    let query = stringify({ ...variables, ...params });
    history.push(`${path}?${query}`);
  }

  if (loading || !data) return <p>Loading ...</p>;
  if (error) throw error;
  return (
    <>
      <SearchForm defaultValues={variables} onSubmit={search} />
      <Results
        data={data.loos}
        rowsPerPage={variables.limit}
        handleChangePage={(e, page) => search({ page })}
        handleChangeRowsPerPage={(e) => search({ limit: e.target.value })}
      />
    </>
  );
}
