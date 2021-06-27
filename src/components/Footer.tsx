import React from 'react';
import { Link } from 'next/link';
import styled from '@emotion/styled';

import Box from './Box';
import Text from './Text';

import domestosLogo from '../images/domestos_logo3.png';
import domestosUseLoos from '../images/domestos_use_our_loos_logo.png';

const DomestosLogo = styled((props) => (
  <img {...props} src={domestosLogo} alt="Domestos" />
))`
  height: 2rem;
`;

const UseOurLoosLogo = styled((props) => (
  <img {...props} src={domestosUseLoos} alt="Domestos: Use our loos" />
))`
  height: 2rem;
`;

const Footer = ({ children }) => (
  <Box
    as="footer"
    display="flex"
    flexDirection={['column', 'row']}
    justifyContent="space-between"
    alignItems="center"
    px={[3, 4]}
    py={[0, 2]}
    bg={['transparent', 'lightGrey']}
    color="primary"
    height={['auto', 60]}
  >
    <Link
      to="/use-our-loos"
      title="Domestos: Use Our Loos Campaign"
      scroll={(el) => el.scrollIntoView(true)}
    >
      <Box display="flex" flexDirection={['column', 'row']} alignItems="center">
        <Text fontSize={14}>
          <small>Proudly sponsored by Domestos</small>
        </Text>

        <Box display="flex" ml={[0, 3]} mb={[3, 0]} order={[-1, 0]}>
          <UseOurLoosLogo />
          <Box ml={2}>
            <DomestosLogo />
          </Box>
        </Box>
      </Box>
    </Link>

    <Box order={[-1, 0]} mb={[4, 0]}>
      <Text fontSize={[12, 16]}>
        <Box as="ul" display={['block', 'flex']} alignItems="center">
          {React.Children.map(children, (child, index) => (
            <li key={index}>{child}</li>
          ))}

          <Box as="li" ml={[0, 4]}>
            <Link to="/privacy">Privacy Policy</Link>
          </Box>
        </Box>
      </Text>
    </Box>
  </Box>
);

export default Footer;
