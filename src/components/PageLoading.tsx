import React from 'react';

import PageLayout from './PageLayout';
import Box from './Box';
import Spacer from './Spacer';
import Text from './Text';
import Logo from './Logo';

const PageLoading = () => (
  <PageLayout>
    <Box
      role="alert"
      aria-live="assertive"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100%"
      width="100%"
      p={3}
    >
      <Logo />
      <Spacer mt={3} />
      <Text fontSize={20} fontWeight="bold" color="tertiary">
        Please wait&hellip;
      </Text>
    </Box>
  </PageLayout>
);

export default PageLoading;
