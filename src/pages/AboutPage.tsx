import React from 'react';
import { Link } from 'next/link';
import { Helmet } from 'react-helmet';
import styled from '@emotion/styled';

import PageLayout from '../components/PageLayout';
import Container from '../components/Container';
import Button from '../components/Button';
import Text from '../components/Text';
import Spacer from '../components/Spacer';
import Box from '../components/Box';

import config from '../config';

const List = styled.ul`
  list-style: initial;
`;

const ListItem = (props) => (
  <Box as="li" marginTop={2} marginLeft={4} {...props} />
);

const SubHeading = (props) => (
  <>
    <Spacer mb={4} />
    <Text {...props} fontSize={3} fontWeight="bold">
      <h2>{props.children}</h2>
    </Text>
    <Spacer mb={3} />
  </>
);

const AboutPage = (props) => {
  return (
    <PageLayout layoutMode="blog">
      <Helmet>
        <title>{config.getTitle('About')}</title>
      </Helmet>

      <Container maxWidth={845}>
        <Text fontSize={6} fontWeight="bold" textAlign="center">
          <h1>About the Toilet Map</h1>
        </Text>
        <Spacer mb={5} />
        <p>
          The Great British Public Toilet Map is a website to help people find
          toilets across the UK. It is the UK's largest database of
          publicly-accessible toilets, with over 11000 facilities.
        </p>
        <p>
          Everyone will, at some point in the day, need to use the toilet. Some
          people will need facilities more than others, and some will need to
          find toilets sooner rather than later.
        </p>
        <p>
          The Great British Public Toilet Map aims to be a complete, up-to-date,
          sustainable source of toilet locations. It's the UK's largest database
          of publicly-accessible toilets (see below), with over 11000
          facilities.
        </p>
        <p>
          The Great British Public Toilet Map is run by Public Convenience, a
          joint venture between researchers Dr Jo-Anne Bichard and Gail Ramster
          (who created the map at the RCA Helen Hamlyn Centre for Design) and
          software development company{' '}
          <Button
            variant="link"
            as="a"
            href="https://www.neontribe.co.uk/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Neontribe
          </Button>{' '}
          (who designed and built it).
        </p>
        <p>
          The information comes from the public - anyone can go on the website
          and{' '}
          <Button variant="link" as={Link} to="/">
            add, edit or remove toilets
          </Button>
          . We also use open data and request information from councils,{' '}
          <Button
            variant="link"
            as="a"
            href="https://www.openstreetmap.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            OpenStreetMap
          </Button>
          , private companies and organisations.
        </p>
        <SubHeading>Publicly Accessible Toilets</SubHeading>
        <p>
          The project aims to map all publicly-accessible toilets - that means
          all toilets that the public can access without needing to be a
          customer.
        </p>
        <Spacer mb={3} />
        This includes:
        <List>
          <ListItem>public toilets</ListItem>
          <ListItem>
            toilets in train stations, bus stations, service/petrol stations,
            tube stations, ferry terminals, airports and other transport
            networks
          </ListItem>
          <ListItem>shopping centre toilets</ListItem>
          <ListItem>
            toilets in public buildings, such as town halls, libraries,
            hospitals, museums and leisure centres
          </ListItem>
          <ListItem>
            toilets in other businesses where the business agrees that the
            public can use their toilets without having to buy anything. These
            are often part of Community Toilet Schemes (run by councils) and can
            include shops, cafes, supermarkets, restaurants, hotels and pubs.
          </ListItem>
          <ListItem>
            We try not to show toilets where you need to ask permission to use
            it, such as those that are for customers-only. The exception is
            platform-side toilets at stations. These are only accessible to
            ticket-holders but we feel it is still useful information,
            particularly when many trains don’t have toilets onboard.
          </ListItem>
        </List>
        <Spacer mb={3} />
        <p>
          If you have any problems updating the toilets, or wish to send us
          toilet details or comments, please contact{' '}
          <Button variant="link" as="a" href="mailto:gbtoiletmap@gmail.com">
            gbtoiletmap@gmail.com
          </Button>
          .
        </p>
        <SubHeading>The Explorer</SubHeading>
        <p>
          <Button variant="link" as="a" href="">
            <Link to="/explorer">Visit the Explorer</Link>
          </Button>
          &nbsp;to get an overview of the statistics and details related to the
          Toilet Map. These statistics are calculated on-demand, so will be up
          to date, and can help to provide a overview of public toilet coverage
          across the country.
        </p>
      </Container>
    </PageLayout>
  );
};

export default AboutPage;
