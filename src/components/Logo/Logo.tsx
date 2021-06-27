import React from 'react';

import Box from '../Box';

import logo from './logo.svg';

const Logo = (props) => (
  <Box
    as="img"
    src={logo}
    alt="The Great British Toilet Map"
    width={154}
    {...props}
  />
);

export default Logo;
