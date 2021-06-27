import React from 'react';
import config from '../config';

const MapStateContext = React.createContext();

const reducer = (state, newState) => {
  return {
    ...state,
    ...newState,
  };
};

export const MapStateProvider = ({ children }) => {
  const [state, setState] = React.useReducer(reducer, {
    center: config.fallbackLocation,
    zoom: 16,
    radius: 1000,
    geolocation: null,
  });

  return (
    <MapStateContext.Provider value={[state, setState]}>
      {children}
    </MapStateContext.Provider>
  );
};

export const useMapState = () => React.useContext(MapStateContext);
