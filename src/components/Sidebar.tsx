import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import isPropValid from '@emotion/is-prop-valid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFilter,
  faAngleRight,
  faPlusCircle,
  faMapMarkerAlt,
} from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'next/link';

import { Media } from './Media';
import VisuallyHidden from './VisuallyHidden';
import Box from './Box';
import Text from './Text';
import Icon from './Icon';
import LocationSearch from './LocationSearch';
import Filters from './Filters';
import Button from './Button';
import Drawer from './Drawer';
import { useMapState } from './MapState';

const Arrow = styled((props) => <Icon icon={faAngleRight} {...props} />, {
  shouldForwardProp: (prop) => {
    return isPropValid(prop) && prop !== 'isExpanded';
  },
})`
  transition: transform 0.2s ease;

  ${(props) =>
    props.isExpanded &&
    `
    transform: rotate(90deg);
  `}
`;

Arrow.propTypes = {
  isExpanded: PropTypes.bool,
};

const StyledNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
`;

const Sidebar = ({
  filters,
  onFilterChange,
  onSelectedItemChange,
  onUpdateMapPosition,
  mapCenter,
}) => {
  const [isFilterExpanded, setIsFilterExpanded] = useState(false);
  const [isFiltersExpanded, setIsFiltersExpanded] = useState(false);
  const filterToggleRef = useRef(null);
  const [, setMapState] = useMapState();

  return (
    <section aria-labelledby="heading-search">
      <Media lessThan="md">
        <VisuallyHidden>
          <h2 id="heading-search">Search</h2>
        </VisuallyHidden>

        <LocationSearch
          onSelectedItemChange={(center) => onUpdateMapPosition({ center })}
        />

        <Box display="flex" justifyContent="center" mt={3}>
          <Button
            ref={filterToggleRef}
            variant="secondary"
            icon={<FontAwesomeIcon icon={faFilter} />}
            aria-expanded={isFiltersExpanded}
            onClick={() => setIsFiltersExpanded(!isFiltersExpanded)}
          >
            Filter Map
          </Button>
        </Box>

        <Box display="flex" justifyContent="center" mt={3}>
          <Button
            type="button"
            onClick={() => {
              navigator.geolocation.getCurrentPosition(({ coords }) => {
                const { latitude: lat, longitude: lng } = coords;
                const location = { lat, lng };

                setMapState({
                  geolocation: location,
                  center: location,
                });

                window.plausible('Find a toilet near me');
              });
            }}
            aria-label="Find a toilet near me"
          >
            Find a toilet near me
          </Button>
        </Box>

        <Drawer visible={isFiltersExpanded} animateFrom="left">
          <Box display="flex" justifyContent="space-between" mb={4}>
            <Box display="flex" alignItems="flex-end">
              <FontAwesomeIcon icon={faFilter} fixedWidth size="lg" />
              <Box as="h2" mx={2}>
                <Text lineHeight={1}>
                  <b>Filter</b>
                </Text>
              </Box>
            </Box>

            <Text fontSize={12}>
              <Box
                as="button"
                type="button"
                onClick={() => onFilterChange({})}
                border={0}
                borderBottom={2}
                borderStyle="solid"
              >
                Reset Filter
              </Box>
            </Text>
          </Box>

          <Filters filters={filters} onFilterChange={onFilterChange} />

          <Box display="flex" justifyContent="center" mt={4}>
            <Button
              onClick={() => {
                setIsFiltersExpanded(false);

                // return focus to the control that invoked the filter overlay
                filterToggleRef.current.focus();
              }}
              css={{
                width: '100%',
              }}
            >
              Done
            </Button>
          </Box>
        </Drawer>
      </Media>

      <Media greaterThan="sm">
        <Box p={4} borderRadius={35} bg="white" width="100%">
          <h2 id="heading-search">
            <b>Search</b>
          </h2>

          <Box mt={3}>
            <LocationSearch onSelectedItemChange={onSelectedItemChange} />
          </Box>

          <Box as="section" my={4} aria-labelledby="heading-filters">
            <h2 id="heading-filters">
              <VisuallyHidden>Filters</VisuallyHidden>
            </h2>

            <Box display="flex" justifyContent="space-between">
              <Box
                as="button"
                type="button"
                display="flex"
                alignItems="center"
                aria-expanded={isFilterExpanded}
                onClick={() => setIsFilterExpanded(!isFilterExpanded)}
              >
                <Icon icon={faFilter} fixedWidth size="lg" />
                <Box mx={2}>
                  <Text lineHeight={1}>
                    <b>Filter</b>
                  </Text>
                </Box>
                <Arrow isExpanded={isFilterExpanded} />
              </Box>

              {isFilterExpanded && (
                <Text fontSize={12}>
                  <Box
                    as="button"
                    type="button"
                    onClick={() => onFilterChange({})}
                    border={0}
                    borderBottom={2}
                    borderStyle="solid"
                  >
                    Reset Filter
                  </Box>
                </Text>
              )}
            </Box>

            <Box pt={4} hidden={!isFilterExpanded}>
              <Filters filters={filters} onFilterChange={onFilterChange} />
            </Box>
          </Box>

          <Box as="section" mt={4} aria-labelledby="heading-add">
            <h2 id="heading-add">
              <VisuallyHidden>Add a toilet</VisuallyHidden>
            </h2>
            <StyledNavLink
              to={`/loos/add?lat=${mapCenter.lat}&lng=${mapCenter.lng}`}
            >
              <Icon icon={faPlusCircle} fixedWidth size="lg" />
              <Box mx={2}>
                <Text lineHeight={1}>
                  <b>Add a Toilet</b>
                </Text>
              </Box>
              <Arrow />
            </StyledNavLink>

            <Box as="section" mt={4} aria-labelledby="heading-find">
              <h2 id="heading-find">
                <VisuallyHidden>Find a toilet near me</VisuallyHidden>
              </h2>
              <Box
                as="button"
                type="button"
                display="flex"
                alignItems="center"
                onClick={() => {
                  navigator.geolocation.getCurrentPosition(({ coords }) => {
                    const { latitude: lat, longitude: lng } = coords;
                    const location = { lat, lng };

                    setMapState({
                      geolocation: location,
                      center: location,
                    });

                    window.plausible('Find a toilet near me');
                  });
                }}
              >
                <Icon icon={faMapMarkerAlt} fixedWidth size="lg" />
                <Box mx={2}>
                  <Text lineHeight={1}>
                    <b>Find a toilet near me</b>
                  </Text>
                </Box>
                <Arrow />
              </Box>
            </Box>
          </Box>
        </Box>
      </Media>
    </section>
  );
};

Sidebar.propTypes = {
  filters: PropTypes.object.isRequired,
  onUpdateMapPosition: PropTypes.func.isRequired,
  onFilterChange: PropTypes.func.isRequired,
  onSelectedItemChange: PropTypes.func.isRequired,
};

export default Sidebar;
