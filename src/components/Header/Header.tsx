import React, { useState } from 'react';
import Link from 'next/link';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

import Box from '../Box';
import VisuallyHidden from '../VisuallyHidden';
import { Media } from '../Media';
import Drawer from '../Drawer';
import Icon from '../Icon';
import Logo from '../Logo';
import Text from '../Text';
import Spacer from '../Spacer';

import MainMenu from './MainMenu';

import config from '../../config';

const CovidNotification = ({ onClose }) => (
  <Text fontSize={[14, 16]} color="white">
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      px={[3, 4]}
      py={2}
      bg="primary"
    >
      <div>
        <h2 css={{ display: 'inline', fontWeight: 'bold' }}>COVID-19:</h2>&nbsp;
        Toilets in businesses may not currently be open to non-customers. For
        public toilets, check with local authority websites. Toilets in
        supermarkets, shopping centres, train stations and service stations are
        mostly open.
      </div>

      <Spacer ml={[2, 4]} />

      <Text fontSize={20}>
        <button type="button" aria-label="Close notification" onClick={onClose}>
          <Icon icon={faTimes} />
        </button>
      </Text>
    </Box>
  </Text>
);

const Header = ({ mapCenter, children }) => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const showCovidNotification =
    config.getSetting('notification', 'covid') !== 'dismissed';

  return (
    <Box as="header">
      {showCovidNotification && (
        <CovidNotification
          onClose={() => {
            config.setSetting('notification', 'covid', 'dismissed');
            window.location.reload();
          }}
        />
      )}

      <Box
        display="flex"
        alignItems="center"
        px={[3, 4]}
        py={2}
        bg="white"
        minHeight={60}
      >
        <Box flexShrink={0}>
          <Link href="/">
            <Logo />
          </Link>
        </Box>

        <Box as="nav" width="100%" aria-labelledby="menu-main">
          <h2 id="menu-main">
            <VisuallyHidden>Main menu</VisuallyHidden>
          </h2>

          <Box as={Media} at="sm" display="flex" justifyContent="flex-end">
            <button
              type="button"
              aria-expanded={isMenuVisible}
              onClick={() => setIsMenuVisible(!isMenuVisible)}
            >
              <VisuallyHidden>Toggle main menu</VisuallyHidden>
              <Icon icon={faBars} size="2x" />
            </button>

            <Drawer visible={isMenuVisible} zIndex={200}>
              <MainMenu
                mapCenter={mapCenter}
                onMenuItemClick={() => setIsMenuVisible(false)}
                children={children}
              />
            </Drawer>
          </Box>

          <Media greaterThan="sm">
            <MainMenu mapCenter={mapCenter} children={children} />
          </Media>
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
