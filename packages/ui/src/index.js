// Polyfills
import 'core-js/fn/array/find';
import 'core-js/fn/array/includes';
import 'core-js/fn/string/repeat';
import 'core-js/fn/object/entries';

import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch } from 'react-router-dom';

import * as serviceWorker from './serviceWorker';

// Global CSS
import './css/global';

import App from './components/App';
import ProtectedRoute from './components/ProtectedRoute';
import AuthCallback from './pages/AuthCallback';
import LooPage from './pages/LooPage';
import RemovePage from './pages/RemovePage';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import AddEditPage from './pages/AddEditPage';
import LoginPage from './pages/LoginPage';
import PreferencesPage from './pages/PreferencesPage';
import ThanksPage from './pages/ThanksPage';
import MapPage from './pages/MapPage';
import UseOurLoosPage from './pages/UseOurLoosPage';
import PrivacyPage from './pages/PrivacyPage';
import NotFound from './pages/404';

import history from './history';
import Auth from './Auth';
import localSchema from './localSchema';
import Router from './Router';
import config from './config';

import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';

import { setContext } from 'apollo-link-context';

import { version } from '../package.json';

const auth = new Auth();

//
// Create GraphQL client
//

const { REACT_APP_BAKED_BACKEND } = process.env;

const httpLink = new HttpLink({
  uri: REACT_APP_BAKED_BACKEND || '/graphql',
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      'apollographql-client-name': 'toiletmap-ui',
      'apollographql-client-version': `${version}`,
      authorization: auth.isAuthenticated()
        ? `Bearer ${auth.getAccessToken()}`
        : '',
    },
  };
});

const cache = new InMemoryCache({
  typePolicies: {
    Loo: {
      keyFields(obj, context) {
        // We specify this explicitally in case Apollo change how ids are autogenerated
        // in the future
        return 'Loo:' + obj.id;
      },
    },
  },
});

const client = new ApolloClient({
  name: 'Toilet Map UI',
  version: version,
  link: authLink.concat(httpLink),
  cache,
  ...localSchema,
});

// Set the initial cache state
let isAuthed = auth.isAuthenticated();
const initialState = {
  viewMap: true, // whether to view a map or list
  mapZoom: 16,
  mapCenter: {
    __typename: 'Point',
    lat: 0,
    lng: 0,
  },
  mapRadius: 10000,
  userData: {
    __typename: 'UserData',
    loggedIn: isAuthed,
    name: isAuthed ? auth.getProfile().name : null,
  },
};

const initialize = () => {
  cache.writeData({
    data: initialState,
  });
};

initialize();

// resetStore isn't used anywhere yet, but just in case...
client.onResetStore(initialize);

const startApp = () => {
  if (typeof document !== 'undefined') {
    ReactDOM.render(
      <ApolloProvider client={client}>
        <Router history={history} forceRefresh={false}>
          <App>
            <Switch>
              <Route
                exact
                path="/"
                render={props => <HomePage auth={auth} {...props} />}
              />
              <Route exact path="/preferences" component={PreferencesPage} />
              <Route exact path="/about" component={AboutPage} />
              <Route exact path="/privacy" component={PrivacyPage} />
              <Route exact path="/use-our-loos" component={UseOurLoosPage} />
              <Route path="/loos/:id" exact component={LooPage} />
              <Route
                path="/login"
                render={props => <LoginPage auth={auth} {...props} />}
              />
              <Route
                path="/map/:lng/:lat"
                render={props => <MapPage auth={auth} {...props} />}
              />
              <Route
                exact
                path="/callback"
                render={props => <AuthCallback auth={auth} {...props} />}
              />
              <ProtectedRoute
                exact
                path="/report"
                auth={auth}
                injectProps={{ cache }}
                component={AddEditPage}
              />
              <ProtectedRoute
                path="/loos/:id/edit"
                auth={auth}
                injectProps={{ cache }}
                component={AddEditPage}
              />
              <ProtectedRoute
                path="/loos/:id/remove"
                component={RemovePage}
                auth={auth}
              />
              <ProtectedRoute
                path="/loos/:id/thanks"
                component={ThanksPage}
                auth={auth}
              />
              <Route component={NotFound} />
            </Switch>
          </App>
        </Router>
      </ApolloProvider>,
      document.getElementById('root')
    );
  }
};

if (config.isNativeApp()) {
  var Auth0Cordova = require('@auth0/cordova');

  const main = () => {
    function intentHandler(url) {
      Auth0Cordova.onRedirectUri(url);
    }
    window.handleOpenURL = intentHandler;

    startApp();
  };

  document.addEventListener('deviceready', main, false);
} else {
  startApp();
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA

serviceWorker.unregister();
