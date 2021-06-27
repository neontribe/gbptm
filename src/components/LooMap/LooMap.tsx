import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'next/link';
import { css } from '@emotion/core';
import { Map, TileLayer, ZoomControl } from 'react-leaflet';
import 'focus-visible';

import config from '../../config.js';
import LocateMapControl from './LocateMapControl';
import ToiletMarkerIcon from './ToiletMarkerIcon';
import AccessibilityIntersection from './AccessibilityIntersection';
import AccessibilityList from './AccessibilityList';

import Box from '../Box';
import Marker from './Marker';
import VisuallyHidden from '../VisuallyHidden';
import { Media } from '../Media';

import crosshair from '../../images/crosshair.svg';

import 'leaflet/dist/leaflet.css';

const KEY_ENTER = 13;

const LooMap = ({
  center,
  zoom,
  minZoom,
  maxZoom,
  onViewportChanged,
  loos,
  staticMap,
  controlsOffset,
  showCrosshair,
  withAccessibilityOverlays,
}) => {
  const mapRef = React.useRef();
  const [intersectingToilets, setIntersectingToilets] = React.useState([]);
  const [
    renderAccessibilityOverlays,
    setRenderAccessibilityOverlays,
  ] = React.useState(false);
  const [announcement, setAnnouncement] = React.useState(null);

  useEffect(() => {
    const { leafletElement } = mapRef.current;
    const map = leafletElement.getContainer();

    // when focused on the map container, Leaflet allows the user to pan the map by using the arrow keys
    // without the application role screen reader software overrides these controls
    //
    // this also avoids the entire main region being announced
    map.setAttribute('role', 'application');
    map.setAttribute('aria-label', 'Map');

    // ensure all map tiles are loaded on Safari
    // https://github.com/neontribe/gbptm/issues/776
    setTimeout(() => {
      leafletElement.invalidateSize({
        pan: false,
      });
    }, 400);
  }, []);

  const handleViewportChanged = () => {
    const map = mapRef.current.leafletElement;
    const center = map.getCenter();
    const zoom = map.getZoom();

    const bounds = map.getBounds();
    const radius = parseInt(bounds.getNorthEast().distanceTo(center));

    onViewportChanged({
      center,
      zoom,
      radius,
    });
  };

  const { push } = useHistory();

  const memoizedMarkers = React.useMemo(
    () =>
      loos.map((toilet) => (
        <Marker
          key={toilet.id}
          position={toilet.location}
          zIndexOffset={toilet.isHighlighted ? 1000 : 0}
          icon={
            new ToiletMarkerIcon({
              isHighlighted: toilet.isHighlighted,
              toiletId: toilet.id,
              isUseOurLoosCampaign: toilet.campaignUOL,
            })
          }
          label={toilet.name || 'Unnamed toilet'}
          onClick={() => {
            if (!staticMap) {
              push(`/loos/${toilet.id}`);
            }
          }}
          onKeyDown={(event) => {
            if (!staticMap && event.originalEvent.keyCode === KEY_ENTER) {
              push(`/loos/${toilet.id}`);
            }
          }}
          keyboard={false}
        />
      )),
    [loos, staticMap, push]
  );

  const keyboardSelectionHandler = React.useCallback(
    (selectionIndex) => {
      const toilet = intersectingToilets[selectionIndex];

      if (!toilet) {
        return;
      }

      setAnnouncement(`${toilet.name || 'Unnamed toilet'} selected`);

      push(`/loos/${toilet.id}`);
    },
    [intersectingToilets, push]
  );

  React.useEffect(() => {
    if (withAccessibilityOverlays && mapRef.current) {
      const map = mapRef.current.leafletElement.getContainer();

      const callback = function (mutationsList) {
        for (let mutation of mutationsList) {
          const focusVisible = mutation.target.dataset.focusVisibleAdded === '';

          if (focusVisible !== renderAccessibilityOverlays) {
            setRenderAccessibilityOverlays(focusVisible);
          }
        }
      };

      const observer = new MutationObserver(callback);

      // only render accessibility overlays when [data="focus-visible-added"] is applied
      //
      // we conditionally render instead of toggling CSS display since we want to avoid AccessibilityList being announced
      // before the map is keyboard focused
      observer.observe(map, { attributes: true });

      return () => {
        observer.disconnect();
      };
    }
  }, [withAccessibilityOverlays, mapRef, renderAccessibilityOverlays]);

  return (
    <Box
      position="relative"
      height="100%"
      width="100%"
      css={
        showCrosshair
          ? css`
              &:after {
                content: url(${crosshair});
                position: absolute;
                top: 50%;
                left: 50%;
                display: block;
                height: 53px;
                width: 52px;
                transform: translate(-50%, -50%);
              }
            `
          : undefined
      }
    >
      <Map
        ref={mapRef}
        center={center}
        zoom={zoom}
        minZoom={minZoom}
        maxZoom={maxZoom}
        onViewportChanged={handleViewportChanged}
        dragging={!staticMap}
        scrollWheelZoom={!staticMap}
        zoomControl={false}
        tap={false}
        css={(theme) => css`
          height: 100%;
          width: 100%;
          position: relative;
          z-index: 0;

          .leaflet-bottom {
            bottom: ${controlsOffset}px;
          }

          .leaflet-bar {
            border: none;
            box-shadow: none;
          }

          a.leaflet-bar-part,
          a.leaflet-control-zoom-in,
          a.leaflet-control-zoom-out {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 40px;
            height: 40px;
            color: ${theme.colors.primary};
            border: 1px solid ${theme.colors.primary};
            border-radius: 20px;

            &:not(:first-of-type) {
              margin-top: 10px;
            }

            &:first-of-type,
            &:last-of-type {
              border-radius: 20px;
            }
          }

          &[data-focus-visible-added] {
            border: 2px solid ${theme.colors.tertiary};
          }

          .leaflet-control [data-focus-visible-added] {
            outline: 2px solid ${theme.colors.tertiary} !important;
            outline-offset: 3px;
          }

          &[data-focus-visible-added] {
            outline-offset: 0;
          }
        `}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          minZoom={minZoom}
          maxZoom={maxZoom}
        />

        {memoizedMarkers}

        <Media greaterThan="md">
          <ZoomControl position="bottomright" />
        </Media>

        <LocateMapControl position="bottomright" />

        {renderAccessibilityOverlays && (
          <>
            <AccessibilityIntersection
              className="accessibility-box"
              toilets={loos}
              bounds={mapRef.current.leafletElement.getBounds().pad(-0.4)}
              onIntersection={setIntersectingToilets}
              onSelection={keyboardSelectionHandler}
              center={center}
            />

            <AccessibilityList
              toilets={intersectingToilets.map((toilet) => toilet.name)}
            />

            <VisuallyHidden>
              <div
                role="status"
                aria-atomic="true"
                aria-live="polite"
                aria-relevant="additions text"
                children={announcement}
              />
            </VisuallyHidden>
          </>
        )}
      </Map>
    </Box>
  );
};

LooMap.propTypes = {
  loos: PropTypes.array,
  center: PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number,
  }).isRequired,
  zoom: PropTypes.number,
  minZoom: PropTypes.number,
  maxZoom: PropTypes.number,
  staticMap: PropTypes.bool,
  onViewportChanged: PropTypes.func,
  controlsOffset: PropTypes.number,
  showCrosshair: PropTypes.bool,
  withAccessibilityOverlays: PropTypes.bool,
};

LooMap.defaultProps = {
  loos: [],
  zoom: config.initialZoom,
  minZoom: config.minZoom,
  maxZoom: config.maxZoom,
  staticMap: false,
  onViewportChanged: Function.prototype,
  controlsOffset: 0,
  withAccessibilityOverlays: true,
};

export default LooMap;
