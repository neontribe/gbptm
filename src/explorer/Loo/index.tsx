import React from 'react';
import useSWR from 'swr';
import { useParams } from 'next/link';
import { loader } from 'graphql.macro';
import { print } from 'graphql/language/printer';

import Map from './Map';
import PropertyTable from './PropertyTable';
import ExpandableReport from './ExpandableReport';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import RaisedButton from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import pickBy from 'lodash/pickBy';
import omit from 'lodash/omit';

import { useAuth } from '../../Auth';

const LOO_DETAILS = print(loader('./looDetails.graphql'));

function Loo(props) {
  const auth = useAuth();
  let { id } = useParams();

  const { isValidating: loading, data, error } = useSWR([
    LOO_DETAILS,
    JSON.stringify({ id }),
  ]);

  if (loading || !data) return <p>Loading Loo Info</p>;
  if (error) return <p>Failed to fetch loo :(</p>;

  let loo = pickBy(data.loo, (val) => val !== null);
  let displayProperties = omit(loo, '__typename', 'area', 'reports');

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item md={6} sm={12}>
          <Typography variant="h2">{loo.name}</Typography>
          {loo.area
            ? loo.area.map(({ name, type }) => (
                <Typography key={name} variant="subtitle1">
                  {name} / {type}
                </Typography>
              ))
            : null}
          {auth.isAuthenticated() && (
            <div>
              <RaisedButton
                variant="contained"
                color="secondary"
                target="_blank"
                rel="noopener noreferer"
                href={`/loos/${loo.id}/edit`}
              >
                Edit
              </RaisedButton>
            </div>
          )}
        </Grid>
        <Grid item md={6} sm={12}>
          <Paper style={{ height: '300px', width: '100%' }}>
            <Map {...loo.location} />
          </Paper>
        </Grid>

        <Grid container item>
          <Grid item>
            <Typography variant="h4">Toilet Data</Typography>
          </Grid>
          <PropertyTable items={displayProperties} />
        </Grid>

        <Grid container item sm={12}>
          <Grid item sm={12}>
            <Typography variant="h4">Loo Reports</Typography>
          </Grid>
          <div>
            {loo.reports.map((report) => (
              <ExpandableReport report={report} />
            ))}
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default Loo;
