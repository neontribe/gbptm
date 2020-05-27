import React from 'react';

import PageLayout from '../components/PageLayout';
import Container from '../components/Container';
import Button from '../components/Button';
import Text from '../components/Text';
import Spacer from '../components/Spacer';

const ContactPage = (props) => {
  return (
    <PageLayout>
      <Container maxWidth={845}>
        <Spacer mb={5} />
        <Text fontSize={6} fontWeight="bold" textAlign="center">
          <h1>Contact Us</h1>
        </Text>
        <Spacer mb={5} />
        <p>
          If you have any problems updating the toilets, or wish to send us
          toilet details or comments, please contact{' '}
          <Button variant="link" as="a" href="mailto:gbtoiletmap@gmail.com">
            gbtoiletmap@gmail.com
          </Button>
          .
        </p>
      </Container>
    </PageLayout>
  );
};

export default ContactPage;
