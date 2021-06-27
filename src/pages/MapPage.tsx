import React from 'react';

import HomePage from '.';

const MapPage = (props) => {
  return (
    <HomePage
      initialPosition={{
        lat: parseFloat(props.match.params.lat),
        lng: parseFloat(props.match.params.lng),
      }}
    />
  );
};

export default MapPage;
