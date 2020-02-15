import React, { Component } from 'react';
import { navigate, Location } from '@reach/router';
// import _ from 'lodash';
import moment from 'moment';

import QueryScoper from './stats/QueryScoper';

const historyStarts = moment('2015-01-23');
const historyEnds = moment().add(1, 'days');

class Statistics extends Component {
  constructor(props) {
    super(props);

    this.state = {
      refreshing: false,
      counters: null,
      proportions: null,
      contributors: null,
      areaData: {},
      areaTypeList: [],
      areaList: [],
      minDate: historyStarts,
      maxDate: historyEnds,
    };

    this.updateQuery = this.updateQuery.bind(this);
  }

  /**
   * Gets list of areas and area Types to use in the area dropdowns
   */
  async componentDidMount() {
    // TODO: when QueryScoper is made to actually work in the future, fix this to work with GraphQL
    /*
    const result = await api.fetchAreaData();

    result.All = _.uniq(_.flatten(_.values(result))).sort();
    _.each(result, v => v.unshift('All'));
    this.setState({
      areaData: result,
      areaTypeList: _.keys(result).sort(),
      areaList: result.All,
      loadedInitialData: true,
    });
    */
  }

  updateQuery(query) {
    navigate(this.props.location.pathname, {
      state: {
        query: query,
      },
    });
  }

  render() {
    return (
      <div>
        <Location>
          {({ location }) =>
            location.state && (
              <QueryScoper
                start={location.state.start}
                end={location.state.end}
                minDate={this.state.minDate}
                maxDate={this.state.maxDate}
                areaType={location.state.areaType}
                areaTypeList={this.state.areaTypeList}
                area={location.state.area}
                areaData={location.state.areaData}
                onChange={this.updateQuery}
              />
            )
          }
        </Location>
        {this.props.children}
      </div>
    );
  }
}

export default Statistics;
