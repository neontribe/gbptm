import React from 'react';
import L from 'leaflet';
import { useLeaflet } from 'react-leaflet';

const LocationMarker = L.Marker.extend({
  initialize: function (latlng, options) {
    L.Util.setOptions(this, options);
    this._latlng = latlng;
    this.createIcon();
  },

  _getIcon: function (options, style) {
    const { radius, weight } = options;
    const realRadius = radius + weight;
    const diameter = realRadius * 2;
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${diameter}" height="${diameter}" version="1.1" viewBox="-${realRadius} -${realRadius} ${diameter} ${diameter}"><circle r="${radius}" style="${style}" /></svg>`;

    return L.divIcon({
      className: 'leaflet-control-locate-location',
      html: svg,
      iconSize: [diameter, diameter],
    });
  },

  createIcon: function () {
    let style = '';

    const styleOptions = {
      color: 'stroke',
      weight: 'stroke-width',
      fillColor: 'fill',
      fillOpacity: 'fill-opacity',
      opacity: 'opacity',
    };

    // convert style options to css string
    Object.entries(styleOptions).forEach(([option, property]) => {
      if (this.options[option]) {
        style = style + `${property}: ${this.options[option]};`;
      }
    });

    const icon = this._getIcon(this.options, style);
    this.setIcon(icon);
  },
});

const useLocateMapControl = ({
  onLocationFound = Function.prototype,
  onStopLocation = Function.prototype,
}) => {
  const { map } = useLeaflet();

  const layerRef = React.useRef(null);
  React.useEffect(() => {
    layerRef.current = new L.LayerGroup();
    layerRef.current.addTo(map);
  }, [map]);

  const handleLocationFound = React.useCallback(
    (event) => {
      const radius = event.accuracy || 0;
      const latlng = event.latlng;

      L.circle(latlng, radius, {
        color: '#136AEC',
        fillColor: '#136AEC',
        fillOpacity: 0.15,
        weight: 0,
      }).addTo(layerRef.current);

      new LocationMarker(latlng, {
        color: '#fff',
        fillColor: '#2A93EE',
        fillOpacity: 1,
        weight: 3,
        opacity: 1,
        radius: 9,
      }).addTo(layerRef.current);

      setIsActive(true);
      onLocationFound(event);
    },
    [onLocationFound]
  );

  React.useEffect(() => {
    map.on('locationfound', handleLocationFound);
    return () => map.off('locationfound', handleLocationFound);
  }, [map, handleLocationFound]);

  const [isActive, setIsActive] = React.useState(false);

  const startLocate = () => {
    map.locate({ setView: true });
  };

  const stopLocate = () => {
    map.stopLocate();
    layerRef.current.clearLayers();
    setIsActive(false);
    onStopLocation();
  };

  return { startLocate, stopLocate, isActive };
};

export default useLocateMapControl;
