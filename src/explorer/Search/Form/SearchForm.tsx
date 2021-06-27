import React from 'react';
import { loader } from 'graphql.macro';
import { print } from 'graphql/language/printer';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import RaisedButton from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';

import { useForm, Controller } from 'react-hook-form';

import { useAuth } from '../../../Auth';
import Autocomplete from './Autocomplete';

const AREAS_QUERY = print(loader('./areas.graphql'));
const CONTRIBUTORS_QUERY = print(loader('./contributors.graphql'));

export default function SearchForm({ onSubmit, defaultValues }) {
  const auth = useAuth();

  const { control, handleSubmit } = useForm({
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={4}>
        <Grid item>
          <Controller
            name="text"
            label="Search Text"
            as={TextField}
            control={control}
          />
        </Grid>

        <Grid item>
          <InputLabel htmlFor="order">Order by</InputLabel>
          <Controller
            name="order"
            as={
              <Select>
                <MenuItem value={'NEWEST_FIRST'} key={0}>
                  Newest First
                </MenuItem>
                <MenuItem value={'OLDEST_FIRST'} key={1}>
                  Oldest First
                </MenuItem>
              </Select>
            }
            control={control}
          />
        </Grid>

        <Grid item>
          <InputLabel htmlFor="areaName">Area</InputLabel>
          <Controller
            name="areaName"
            as={
              <Autocomplete
                query={AREAS_QUERY}
                placeholderText="Search Areas"
                ariaLabel="Clear area input box"
              />
            }
            control={control}
          />
        </Grid>

        {auth.checkPermission('VIEW_CONTRIBUTOR_INFO') && (
          <Grid item>
            <InputLabel htmlFor="contributor">Contributor</InputLabel>
            <Controller
              name="contributor"
              as={
                <Autocomplete
                  query={CONTRIBUTORS_QUERY}
                  ariaLabel="Clear contributor input box"
                />
              }
              control={control}
            />
          </Grid>
        )}

        <Grid item>
          <Controller
            name="fromDate"
            label="Updated After"
            as={TextField}
            type="date"
            control={control}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>

        <Grid item>
          <Controller
            name="toDate"
            label="Updated before"
            as={TextField}
            type="date"
            control={control}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>

        <Grid item>
          <RaisedButton
            variant="contained"
            color="primary"
            onClick={handleSubmit(onSubmit)}
          >
            <SearchIcon />
            Search
          </RaisedButton>
        </Grid>
      </Grid>
    </form>
  );
}
