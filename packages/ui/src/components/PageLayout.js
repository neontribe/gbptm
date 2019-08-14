import React, { Component } from 'react';
import PropTypes from 'prop-types';

import MediaQuery from 'react-responsive';

import Header from './Header';
import Footer from './Footer';

import layout from './css/layout.module.css';

import config from '../config';
import Tracking, { TRACKING_STATE_CHOSEN } from './Tracking/Tracking';

class PageLayout extends Component {
  state = {
    cookieSettingsOpen:
      config.getSetting(Tracking.configNS, 'trackingState') !==
      TRACKING_STATE_CHOSEN,
  };

  handleCookieButtonClick = () => {
    this.setState({ cookieSettingsOpen: true });
  };

  handleCookieChoiceChange = () => {
    this.setState({ cookieSettingsOpen: false });
  };

  render() {
    return (
      <div className={layout.appContainer}>
        <div className={layout.mainContainer}>
          <div className={layout.main}>
            <Header />

            <main className={layout.content}>
              <Tracking
                analyticsId={config.analyticsId}
                open={this.state.cookieSettingsOpen}
                onChange={this.handleCookieChoiceChange}
              >
                <div>{React.cloneElement(this.props.main, this.props)}</div>
              </Tracking>
            </main>

            <Footer onCookieButtonClick={this.handleCookieButtonClick} />
          </div>
        </div>

        <MediaQuery minWidth={config.viewport.mobile}>
          <aside data-testid="mainMap" className={layout.mapContainer}>
            {React.cloneElement(this.props.map, this.props)}
          </aside>
        </MediaQuery>
      </div>
    );
  }
}

PageLayout.propTypes = {
  main: PropTypes.element.isRequired,
  map: PropTypes.element.isRequired,
};

export default PageLayout;
