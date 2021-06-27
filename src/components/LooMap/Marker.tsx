import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withLeaflet } from 'react-leaflet';
import { Marker } from 'react-leaflet';

const CustomMarker = ({ label, ...props }) => {
  const markerRef = useRef(null);

  useEffect(() => {
    const marker = markerRef.current.leafletElement.getElement();

    marker.setAttribute('role', 'link');
    marker.setAttribute('aria-label', label);
  }, [label]);

  return <Marker ref={markerRef} {...props} />;
};

CustomMarker.propTypes = {
  label: PropTypes.string.isRequired,
};

export default withLeaflet(CustomMarker);
