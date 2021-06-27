import React from 'react';
import styled from '@emotion/styled';
import { variant } from 'styled-system';
import Control from 'react-leaflet-control';

import { useMapState } from '../MapState';
import useLocateMapControl from './useLocateMapControl';

const ControlButton = styled.button(
  ({ theme }) => `
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background-color: ${theme.colors.white};
  color: ${theme.colors.primary};
  border: 1px solid ${theme.colors.primary};
  border-radius: 20px;

  :hover, :focus {
    color: ${theme.colors.primary};
  }
`,
  variant({
    variants: {
      active: {
        bg: 'primary',
        color: 'white',
        ':focus, :hover': {
          color: 'white',
        },
      },
    },
  })
);

const LocateMapControl = ({ position }) => {
  const [, setMapState] = useMapState();

  const onLocationFound = (event) => {
    setMapState({
      geolocation: {
        lat: event.latitude,
        lng: event.longitude,
      },
    });
  };

  const onStopLocation = () => {
    setMapState({
      geolocation: null,
    });
  };

  const { isActive, startLocate, stopLocate } = useLocateMapControl({
    onLocationFound,
    onStopLocation,
  });

  const handleClick = () => {
    if (!isActive) {
      startLocate();
      window.plausible('Geolocate'); 
    } else {
      stopLocate()
    }
  }; 

  return (
    <Control position={position}>
      <ControlButton
        type="button"
        onClick={handleClick}
        aria-label="Locate my position"
        variant={isActive && 'active'}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="35px"
          width="35px"
          viewBox="0 0 40 40"
        >
          <g fill="none" fillRule="evenodd">
            <path
              stroke="currentColor"
              strokeLinecap="square"
              strokeWidth="2"
              d="M20.5 10.5L20.5 5.5M11.5 19.5L6.5 19.5M20.5 29.5L20.5 33.5"
            />
            <path
              stroke="currentColor"
              strokeLinecap="square"
              strokeWidth="2"
              d="M29.5 19.5L33.5 19.5"
            />
            <g transform="translate(11 11)">
              <circle
                cx="9"
                cy="9"
                r="8"
                fill="#FFF"
                stroke="#0BB5FB"
                strokeWidth="2"
              />
              <circle cx="9" cy="9" r="4" fill="#0BB5FB" />
            </g>
          </g>
        </svg>
      </ControlButton>
    </Control>
  );
};

export default LocateMapControl;
