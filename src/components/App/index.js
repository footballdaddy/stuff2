import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Strength from '../Strength';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.timerId = null;
  }
  componentWillUnmount() {
    // Clears interval
    clearInterval(this.timerId);
  }

  componentDidMount() {
    // let timer = setInterval(this.start, 1000);
    // this.setState({ timer });
    this.start();
    // Interval runs every other second (aka 1 sec)
    // this.interval = setInterval(this.attack.bind(this), 1000);
  }

  stop = () => {
    clearInterval(this.timerId);
  };
  start = () => {
    if (!this.timerId) {
      this.timerId = setInterval(() => {
        this.incrementValues();
      }, 1000 / 10);
    }
  };

  incrementValues = () => {
    const { stats } = this.props;
    for (let key in stats) {
      if (stats[key].rate > 0) {
        this.props.incrementValue(key);
      }
    }
  };

  static propTypes = {
    stats: PropTypes.object,
    incrementStat: PropTypes.func,
    decrementStat: PropTypes.func,
  };
  render() {
    const { stats } = this.props;
    return (
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div
          style={{
            display: 'flex',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <h1>Energy: {stats.energy.value}</h1>
          <div>
            <Strength {...this.props} />
          </div>
        </div>
      </div>
    );
  }
}
