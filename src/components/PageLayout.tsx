import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from '@emotion/react';

import Box from './Box';
import { MediaContextProvider, Media } from './Media';
import Header from './Header';
import Footer from './Footer';
import ConditionalWrap from './ConditionalWrap';

import globalStyles from '../globalStyles';
import theme from '../theme';

const LAYOUT_DEFAULT = 'default';
const LAYOUT_BLOG = 'blog';

interface IPageLayout {
  mapCenter?: {lat: number; lng: number;}
  layoutMode: 'default' | 'blog';
  children: React.ReactElement;
}

const PageLayout = ({ mapCenter, layoutMode, children }: IPageLayout) => {
  return (
    <ThemeProvider theme={theme}>
      <MediaContextProvider>
        {globalStyles}

        <Box display="flex" flexDirection="column" height="100%">
          <Header mapCenter={mapCenter}>
            <Footer />
          </Header>

          <Box position="relative" display="flex" flexGrow={1} overflowY="auto">
            <Box
              as="main"
              flexGrow={1}
              // support screen readers in ie11
              role="main"
            >
              <ConditionalWrap
                condition={layoutMode === LAYOUT_BLOG}
                wrap={(children) => <Box my={5} children={children} />}
                children={children}
              />
            </Box>
          </Box>

          <Box mt="auto">
            <Media greaterThan="sm">
              <Footer />
            </Media>
          </Box>
        </Box>
      </MediaContextProvider>
    </ThemeProvider>
  );
};

PageLayout.propTypes = {
  layoutMode: PropTypes.oneOf([LAYOUT_DEFAULT, LAYOUT_BLOG]),
};

PropTypes.defaultProps = {
  layoutMode: LAYOUT_DEFAULT,
};

export default PageLayout;
