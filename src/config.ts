export const FILTERS_KEY = 'filters';

const filters = [
  {
    id: 'noPayment',
    label: 'Free',
  },
  {
    id: 'babyChange',
    label: 'Baby Changing',
  },
  {
    id: 'accessible',
    label: 'Accessible',
  },
  {
    id: 'allGender',
    label: 'Gender Neutral',
  },
  {
    id: 'radar',
    label: 'Radar Key',
  },
  {
    id: 'automatic',
    label: 'Automatic',
  },
];

const messages = {
  created: 'Thank you, toilet added!',
  updated: 'Thank you, details updated!',
  removed: 'Thank you, toilet removed!',
};

const title = 'The Great British Toilet Map';

export default {
  viewport: {
    mobile: 567,
  },
  filters,
  messages,
  analyticsId: window.location.hostname.match(/toiletmap\.org\.uk/)
    ? 'UA-52513593-1'
    : null,
  initialZoom: 16,
  minZoom: 11,
  maxZoom: 18,
  editMinZoom: 16,
  fallbackLocation: {
    // Trafalgar Square. Because.
    lat: 51.507351,
    lng: -0.127758,
  },
  getSettings(namespace) {
    return JSON.parse(localStorage.getItem(namespace) || '{}');
  },
  getSetting(namespace, key, defaultVal = '') {
    const val = this.getSettings(namespace)[key];

    return val === undefined ? defaultVal : val;
  },
  setSetting(namespace, key, val) {
    var settings = this.getSettings(namespace);
    settings[key] = val;
    localStorage.setItem(namespace, JSON.stringify(settings));
  },
  setSettings(namespace, obj = {}) {
    localStorage.setItem(
      namespace,
      JSON.stringify({
        ...this.getSettings(namespace),
        ...obj,
      })
    );
  },
  getTitle(appendText) {
    if (appendText) {
      return `${title}: ${appendText}`;
    }

    return title;
  },
};
