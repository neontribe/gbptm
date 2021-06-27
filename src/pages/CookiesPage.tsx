import React from 'react';
import { Link } from 'next/link';
import { Helmet } from 'react-helmet';

import PageLayout from '../components/PageLayout';
import Container from '../components/Container';
import Spacer from '../components/Spacer';
import Button from '../components/Button';
import Text from '../components/Text';

import config from '../config';

const CookiesPage = () => (
  <PageLayout layoutMode="blog">
    <Helmet>
      <title>{config.getTitle('Cookies')}</title>
    </Helmet>

    <Container maxWidth={845}>
      <Text fontSize={6} fontWeight="bold" textAlign="center">
        <h1>Cookies</h1>
      </Text>
      <Spacer mb={5} />
      <p>
        Opting in to Adobe Analytics means we can share your data with Unilever
        and benefit from Unilever's continued sponsorship.
      </p>
      <p>
        For more detailed information about the cookies we use, see our{' '}
        <Button as={Link} variant="link" to="/privacy">
          privacy policy.
        </Button>
      </p>
    </Container>
  </PageLayout>
);

export default CookiesPage;
