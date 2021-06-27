import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Rectangle } from 'react-leaflet';

// 0-5
// https://github.com/Leaflet/Leaflet/issues/5766
const KEY_CODES = [48, 49, 50, 51, 52, 53];

const AccessibilityIntersection = ({
  toilets = [],
  center,
  onIntersection,
  onSelection,
  ...props
}) => {
  const rectangleRef = useRef(null);

  useEffect(() => {
    const rectangle = rectangleRef.current.leafletElement;
    const contains = toilets
      .filter((toilet) => rectangle.getBounds().contains(toilet.location))
      .slice(0, KEY_CODES.length);

    onIntersection(contains);
  }, [center, toilets, onIntersection]);

  useEffect(() => {
    const keyDownHandler = (event) => {
      const selectionIndex = KEY_CODES.indexOf(event.keyCode);

      if (selectionIndex === -1) {
        return;
      }

      onSelection(selectionIndex);
    };

    document.addEventListener('keydown', keyDownHandler);

    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  }, [onSelection]);

  return <Rectangle bounds={null} ref={rectangleRef} {...props}></Rectangle>;
};

AccessibilityIntersection.propTypes = {
  toilets: PropTypes.arrayOf(
    PropTypes.shape({
      location: PropTypes.shape({
        lat: PropTypes.number.isRequired,
        lng: PropTypes.number.isRequired,
      }).isRequired,
    })
  ),
  onIntersection: PropTypes.func.isRequired,
  onSelection: PropTypes.func.isRequired,
  center: PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number,
  }).isRequired,
};

export default AccessibilityIntersection;
