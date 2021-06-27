import React from 'react';
import PropTypes from 'prop-types';
import {
  faPoundSign,
  faBaby,
  faKey,
  faCog,
  faToilet,
} from '@fortawesome/free-solid-svg-icons';
import { faAccessibleIcon } from '@fortawesome/free-brands-svg-icons';

import Box from './Box';
import Switch from './Switch';
import Icon from './Icon';

import config from '../config';

const iconMap = {
  noPayment: faPoundSign,
  babyChange: faBaby,
  accessible: faAccessibleIcon,
  allGender: faToilet,
  radar: faKey,
  automatic: faCog,
};

const Filters = ({ filters, onFilterChange }) => (
  <ul>
    {config.filters.map(({ id, label }, index) => (
      <Box
        as="li"
        key={id}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mt={index ? 3 : undefined}
      >
        <Box display="flex" alignItems="center">
          <Icon icon={iconMap[id]} fixedWidth size="lg" />
          <Box ml={3} id={`filter-${id}`}>
            {label}
          </Box>
        </Box>

        <Switch
          name={id}
          checked={filters[id] || false}
          aria-labelledby={`filter-${id}`}
          onClick={() => {
            onFilterChange({
              ...filters,
              [id]: !filters[id],
            });
          }}
        />
      </Box>
    ))}
  </ul>
);

Filters.propTypes = {
  filters: PropTypes.object.isRequired,
  onFilterChange: PropTypes.func.isRequired,
};

export default Filters;
