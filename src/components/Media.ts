import { createMedia } from '@artsy/fresnel';

import theme from '../theme';

const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    sm: 0,
    md: parseInt(theme.breakpoints[0]),
    lg: parseInt(theme.breakpoints[1]),
    xl: parseInt(theme.breakpoints[2]),
  },
});

export { MediaContextProvider, Media };
