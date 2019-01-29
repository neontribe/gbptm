import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import MediaQuery from 'react-responsive';
import _ from 'lodash';

import config from '../../config';

import {
  Button,
  LinkButton,
  Group,
  Heading,
  Notification,
  VerticalSpacing,
} from '@toiletmap/design-system';

import LooItem from '../../LooItem';
import PageLayout from '../../PageLayout';
import NearestLooMap from '../../NearestLooMap';

import styles from './MapPage.module.css';

import {
  actionHighlight,
  actionUpdateCenter,
} from '../../redux/modules/mapControls';
import { actionToggleViewMode } from '../../redux/modules/app';
import { actionLogin, actionLogout } from '../../redux/modules/auth';

export class MapPage extends Component {
  positionFromRouter() {
    return {
      lat: parseFloat(this.props.match.params.lat),
      lng: parseFloat(this.props.match.params.lng),
    };
  }

  componentDidMount() {
    this.props.actionUpdateCenter(this.positionFromRouter());
  }

  componentWillUnmount() {
    // Clear any marker highlighting when navigating away
    this.props.actionHighlight(null);
  }

  renderList(mobile) {
    var loos = this.props.loos;

    // Loading - either this is the first query of the user or they are on a
    // mobile and so can't rely on the map's loading spinner to know the loos
    // they see are outdated
    if (!loos || (this.props.loadingNearby && mobile)) {
      return (
        <Notification>
          <p>Fetching toilets&hellip;</p>
        </Notification>
      );
    }

    // No results
    if (loos && !loos.length) {
      return (
        <Notification>
          <p>
            No toilets found within {config.nearestRadius / 1000}
            km.
          </p>
        </Notification>
      );
    }

    return (
      <div>
        <Heading headingLevel={2} size="large">
          Nearest Toilets
        </Heading>
        <ul className={styles.looList}>
          {loos &&
            loos.slice(0, config.nearestListLimit).map((loo, i) => (
              <li key={loo._id} className={styles.looListItem}>
                <LooItem
                  loo={loo}
                  onHoverStart={_.partial(this.props.actionHighlight, loo._id)}
                  onHoverEnd={_.partial(this.props.actionHighlight, undefined)}
                  index={i + 1}
                />
              </li>
            ))}
        </ul>
      </div>
    );
  }

  renderMain() {
    var mode = this.props.app.viewMode;

    return (
      <div className={styles.container}>
        {/* Logged in message */}
        {this.props.isAuthenticated && (
          <React.Fragment>
            <Notification>
              <p>
                Logged in.{' '}
                <button onClick={this.props.doLogout}>Log out</button>
              </p>
            </Notification>
            <VerticalSpacing />
          </React.Fragment>
        )}

        <Group direction="row">
          {config.allowAddEditLoo && (
            <LinkButton to="/report">Add a toilet</LinkButton>
          )}

          <MediaQuery maxWidth={config.viewport.mobile}>
            <Button onClick={this.props.actionToggleViewMode}>
              {mode === 'list' ? 'View map' : 'View list'}
            </Button>
          </MediaQuery>
        </Group>

        <MediaQuery
          maxWidth={config.viewport.mobile}
          className={styles.mobileContent}
        >
          {mode === 'list' && this.renderList(true)}
          {mode === 'map' && (
            <div className={styles.mobileMap}>{this.renderMap()}</div>
          )}
        </MediaQuery>
        <MediaQuery minWidth={config.viewport.mobile}>
          {this.renderList(false)}
        </MediaQuery>
      </div>
    );
  }

  renderMap() {
    return (
      <NearestLooMap
        mapProps={{ initialPosition: this.positionFromRouter() }}
        numberNearest
      />
    );
  }

  render() {
    return <PageLayout main={this.renderMain()} map={this.renderMap()} />;
  }
}

MapPage.propTypes = {
  loos: PropTypes.array,
};

var mapStateToProps = state => ({
  geolocation: state.geolocation,
  mapControls: state.mapControls,
  loos: state.loos.nearby,
  app: state.app,
  isAuthenticated: state.auth.isAuthenticated,
  loadingNearby: state.loos.loadingNearby,
});

var mapDispatchToProps = {
  actionHighlight,
  actionUpdateCenter,
  actionToggleViewMode,
  doLogout: actionLogout,
  doLogin: actionLogin,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(MapPage));
