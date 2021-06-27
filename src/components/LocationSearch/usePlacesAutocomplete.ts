import React from 'react';
import debounce from 'lodash/debounce';

const usePlacesAutocompleteService = () => {
  const autocompleteService = React.useRef();

  React.useEffect(() => {
    if (!window.google || !window.google.maps.places) {
      return;
    }

    if (autocompleteService.current) {
      return;
    }

    autocompleteService.current = new window.google.maps.places.AutocompleteService();
  });

  return autocompleteService;
};

// Session token batches autocomplete results together to reduce Google Maps API costs
// https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service#AutocompleteSessionToken
const usePlacesSessionToken = () => {
  const [token, setToken] = React.useState(null);

  const reset = () => {
    setToken(new window.google.maps.places.AutocompleteSessionToken());
  };

  React.useEffect(() => {
    if (!window.google || !window.google.maps.places) {
      return;
    }

    if (token) {
      return;
    }

    reset();
  });

  return [token, reset];
};

const usePlacesAutocomplete = (input) => {
  const autocompleteService = usePlacesAutocompleteService();

  const [sessionToken, resetSessionToken] = usePlacesSessionToken();

  const [places, setPlaces] = React.useState([]);

  const fetchPlaces = React.useCallback(
    debounce((input) => {
      const onFetchCompleted = (places) => {
        if (!places) {
          return;
        }

        const locationResults = places.map((item) => ({
          id: item.id,
          placeId: item.place_id,
          label: `${item.structured_formatting.main_text}, ${item.structured_formatting.secondary_text}`,
        }));

        setPlaces(locationResults);
      };

      autocompleteService.current.getPlacePredictions(
        { input, types: ['geocode'], sessionToken },
        onFetchCompleted
      );
    }, 300),
    [sessionToken]
  );

  // Fetch places when input changes
  React.useEffect(() => {
    if (input.length < 3) {
      return;
    }

    fetchPlaces(input);
  }, [input, fetchPlaces]);

  // Clear places when input is cleared
  React.useEffect(() => {
    if (input) {
      return;
    }

    setPlaces([]);
  }, [input, setPlaces]);

  const getPlaceLatLng = ({ placeId }) => {
    // PlacesService expects an HTML (normally a map) element
    // https://developers.google.com/maps/documentation/javascript/reference/places-service#library
    const placesService = new window.google.maps.places.PlacesService(
      document.createElement('div')
    );

    const OK = window.google.maps.places.PlacesServiceStatus.OK;

    return new Promise((resolve, reject) => {
      placesService.getDetails({ placeId, sessionToken }, (result, status) => {
        if (status !== OK) {
          reject(status);
          return;
        }

        // Create a new session token when session has completed
        // https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service#AutocompleteSessionToken
        resetSessionToken();

        const { lat, lng } = result.geometry.location;

        resolve({ lat: lat(), lng: lng() });
      });
    });
  };

  return { places, getPlaceLatLng };
};

export default usePlacesAutocomplete;
