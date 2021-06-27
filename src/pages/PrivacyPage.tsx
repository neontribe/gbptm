import React from 'react';
import { Helmet } from 'react-helmet';

import PageLayout from '../components/PageLayout';
import Container from '../components/Container';
import Text from '../components/Text';
import Spacer from '../components/Spacer';
import Button from '../components/Button';

import config from '../config';

const PrivacyPage = () => {
  return (
    <PageLayout layoutMode="blog">
      <Helmet>
        <title>{config.getTitle('Privacy Policy')}</title>
      </Helmet>

      <Container maxWidth={845}>
        <Text fontSize={6} fontWeight="bold" textAlign="center">
          <h1>Privacy Policy</h1>
        </Text>
        <Spacer mb={5} />

        <Text fontSize={3} fontWeight="bold">
          <h2>Visitors to the site</h2>
        </Text>
        <Spacer mb={3} />

        <p>
          The Great British Public Toilet Map uses a cookieless approach to
          gather anonymous data such as which pages are viewed, what time the
          visit occurred, and which site referred the visitor to the web page
          etc.
        </p>
        <p>
          Public Convenience Ltd also notes and saves information such as time
          of day, browser type and content requested. That information is used
          to provide more relevant services to users.
        </p>
        <p>
          We will not associate any data gathered from this site through
          navigation and with any personally identifying information from any
          source. We may also log Internet Protocol (IP) address (but nothing
          that directly identifies visitors) in order to receive and send the
          required information over the internet.
        </p>

        <Spacer mb={4} />
        <Text fontSize={3} fontWeight="bold">
          <h2>Contributors to the site</h2>
        </Text>
        <Spacer mb={3} />
        <p>
          Contributors to The Great British Public Toilet Map website are asked
          to sign-in via the Auth0 platform using their email address. This
          helps us to share data on the quantity and spread of contributions to
          the site which helps show how the community value the project, to
          improve our interfaces for our users, to protect our dataset from
          misuse and to recognise contributions from a user if that user is
          adding unsuitable content, whether intentionally or inadvertently.
        </p>
        {/* Safer to leave the use our loos campaign in? Can we promise that data collected from the app will be separate? */}
        <p>
          A full list of a contributor’s activities will only be accessible to
          Public Convenience Ltd and the Use Our Loos campaign manager, for
          moderating the dataset. A contributor’s full email address will never
          be disclosed or shared and is only visible to Public Convenience Ltd.
        </p>

        <Spacer mb={4} />
        <Text fontSize={3} fontWeight="bold">
          <h2>Public and Business Supporters of Use Our Loos campaign</h2>
        </Text>
        <Spacer mb={3} />
        <p>
          Individuals and businesses who click the “Join the Use Our Loos
          campaign” button on The Great British Public Toilet Map should have
          the opportunity to consider the terms and conditions of the campaign
          before completing the sign-up form there. The campaign is separate
          from The Great British Public Toilet Map. Data added to the Use Our
          Loos campaign is not stored or processed by Public Convenience Ltd.
        </p>
        <p>
          If you'd like to know what we've stored about you, or ask us to forget
          you, or to let us know about something you'd like changed please drop
          us a line at{' '}
          <Button
            as="a"
            variant="link"
            href="mailto:gbtoiletmap@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            gbtoiletmap@gmail.com
          </Button>
          . If you'd like to exercise any of your rights under the GDPR that's
          the address to use.
        </p>
      </Container>
    </PageLayout>
  );
};

export default PrivacyPage;
