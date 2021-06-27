const breakpoints = ['768px', '1024px', '1192px'];
const theme = {
  breakpoints: breakpoints,
  space: [0, 4, 8, 16, 32, 64],
  radii: [0, 4, 8, 16, 32, 64],
  fontSizes: [10, 12, 16, 18, 24, 32, 40],
  colors: {
    primary: '#0a165e',
    secondary: '#92f9db',
    tertiary: '#ed3d62',
    ice: '#d2fff2',
    white: '#fff',
    lightGrey: '#f4f4f4',
    grey: '#807f7f',
    aqua: '#93f9db',
  },
  mediaQueries: breakpoints.map(
    (n) => `@media screen and (min-width: ${n})`
  )
};


export default theme;
