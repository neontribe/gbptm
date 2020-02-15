import { gql } from '@apollo/client';

const resolvers = {
  Mutation: {
    updateCenter: (_root, { lat, lng }, { cache }) => {
      const query = gql`
        query mapCenter {
          mapCenter @client {
            lat
            lng
          }
        }
      `;

      const data = {
        mapCenter: {
          __typename: 'Point',
          lat,
          lng,
        },
      };

      cache.writeQuery({ query, data });

      return true;
    },
    updateZoom: (_root, { zoom }, { cache }) => {
      const query = gql`
        query mapCenter {
          mapZoom @client
        }
      `;

      const data = {
        mapZoom: zoom,
      };

      cache.writeQuery({ query, data });

      return true;
    },
    toggleViewMode: (_root, vars, { cache }) => {
      const query = gql`
        query getViewMap {
          viewMap @client
        }
      `;

      const { viewMap } = cache.readQuery({ query });

      const data = {
        viewMap: !viewMap,
      };

      cache.writeQuery({ data, query });
      return true;
    },
    loginUser: (_root, { name }, { cache }) => {
      const query = gql`
        query getUserData {
          userData @client {
            name
            loggedIn
          }
        }
      `;

      const data = {
        userData: {
          __typename: 'UserData',
          name,
          loggedIn: true,
        },
      };

      cache.writeQuery({ data, query });
      return true;
    },
    logoutUser: (_root, vars, { cache }) => {
      const query = gql`
        query getUserData {
          userData @client {
            name
            loggedIn
          }
        }
      `;

      const data = {
        userData: {
          __typename: 'UserData',
          name: null,
          loggedIn: false,
        },
      };

      cache.writeQuery({ data, query });
      return true;
    },
  },
};

// No validation is done with this, but it allows us an overview of how
// we are handling the local state
const typeDefs = gql`
  extend type Query {
    mapCenter: Point!
    mapZoom: Number!
    viewMap: Boolean!
    userData: UserData!
  }

  extend type Mutation {
    updateCenter(lat: Number!, lng: Number!): Boolean
    updateZoom(zoom: Number!): Boolean
    toggleViewMode: Boolean
    loginUser(name: String!): Boolean
    logoutUser: Boolean
  }

  type Point {
    lat: Number!
    lng: Number!
  }

  type UserData {
    loggedIn: Boolean!
    name: String
  }
`;

export default {
  resolvers,
  typeDefs,
};
