export const PREFERENCES_KEY = 'preferences';
export const AUTH_KEY = 'koasess';
export const PENDING_REPORT_KEY = 'pending_loo_report';

export default {
  viewport: {
    mobile: 567,
  },
  apiEndpoint: 'https://gbptm-stage.herokuapp.com',
  reportEndpoint: 'https://gbptm-stage.herokuapp.com/reports',
  signoutEndpoint: 'https://gbptm-stage.herokuapp.com/signout',
  nearest: {
    limit: 5,
    radius: 5000, // meters
  },
  initialZoom: 16,
  minZoom: 12,
  maxZoom: 18,
  allowAddEditLoo: false,
};