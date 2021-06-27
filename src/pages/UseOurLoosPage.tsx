import React from 'react';
import { Helmet } from 'react-helmet';

import PageLayout from '../components/PageLayout';
import Container from '../components/Container';
import Button from '../components/Button';
import Text from '../components/Text';
import Spacer from '../components/Spacer';
import Box from '../components/Box';

import config from '../config';

import uolLogo from '../images/domestos-use-our-loos-full.png';

const UseOurLoosPage = (props) => {
  return (
    <PageLayout layoutMode="blog">
      <Helmet>
        <title>{config.getTitle('Domestos’ Use Our Loos Scheme')}</title>
      </Helmet>

      <Container maxWidth={845}>
        <Text fontSize={6} fontWeight="bold" textAlign="center">
          <h1>Domestos’ Use Our Loos Scheme</h1>
        </Text>
        <Spacer mb={5} />

        <p>
          We all need toilets. When you need to go, you need to go. At home or
          in an office this isn’t a problem. However, out and about, are you
          sure there’s somewhere to go when the need arises?
        </p>
        <p>
          Across the UK, more than one in every three public toilets have been
          closed over the last two decades. Some councils are already without a
          single free-to-use public convenience.
        </p>
        <p>
          Use Our Loos is the first national community toilet scheme, created by
          the British Toilet Association, Domestos and the Great British Public
          Toilet Map, with the ambition to unlock the loos that are hidden in
          high street cafes, restaurants, coffee shops and bars and open them up
          to the community.
        </p>

        <Spacer mb={5} />

        <Box
          as="figure"
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <Box
            as="img"
            maxWidth={266}
            src={uolLogo}
            alt="Use Our Loos is powered by Domestos"
          />
          <figcaption>
            <Text textAlign="center" fontSize={1}>
              Look out for the Use Our Loos Pin on the map to find toilets
              taking part in the scheme
            </Text>
          </figcaption>
        </Box>

        <Spacer mb={5} />

        <p>
          As more public loos are closed, we’re asking that more loos are made
          public.
        </p>
        <p>
          We’re inviting businesses to sign up and welcome everyone, customers
          and non-customers, to use their loos. In return, we’re providing them
          with free Domestos product, directing people to their venues and
          driving local fame so they will benefit from increased customers and a
          stronger connection to their community.
        </p>
        <p>
          We’re inviting the public to use our map to discover loos near them
          and to help us improve the service by adding new locations or flagging
          loos that have closed.
        </p>
        <p>
          To register your business for the Use Our Loos campaign please contact{' '}
          <Button variant="link" as="a" href="mailto:useourloos@gmail.com">
            useourloos@gmail.com
          </Button>
        </p>
        <p>
          You can also{' '}
          <Button
            variant="link"
            as="a"
            href="https://goo.gl/forms/JRw6J7yoDe46YIB23"
            target="_blank"
            rel="noopener noreferrer"
          >
            register your interest here
          </Button>
          .
        </p>
      </Container>
    </PageLayout>
  );
};

export default UseOurLoosPage;
