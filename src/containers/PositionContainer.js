import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { StyleSheet, css } from 'aphrodite';

import Paper from 'material-ui/Paper';
import FontIcon from 'material-ui/FontIcon';

import BatteryIndicator from '../components/BatteryIndicator';
import Map from '../components/Map';
import TimeControl from '../components/TimeControl';

const styles = StyleSheet.create({
  container: {
    height: '100%',
    position: 'relative',
  },
  overlay: {
    color: 'white',
    position: 'absolute',
    width: '100%',
    height: 60,
    top: 0,
    left: 0,
    background: 'linear-gradient(to bottom,rgba(0,0,0,0.5) 20%,rgba(0,0,0,0) 100%)',
    display: 'flex',
    justifyContent: 'space-around',
  },
  overlayItem: {
    textAlign: 'center',
    flex: 1,
    padding: 12,
    ':first-child': {
      textAlign: 'left',
    },
    ':last-child': {
      textAlign: 'right',
    },
  },
  map: {
    height: 'calc(100% - 48px)',
  },
  mapElement: {
    height: '100%',
  },
});

class PositionContainer extends Component {
  constructor(props) {
    super(props);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.state = {
      time: 0,
    };
  }

  handleOnChange(value) {
    this.setState({
      time: value,
    });
  }

  render() {
    const { infos, frames } = this.props;
    return (
      <div className={css(styles.container)}>
        <Map
          containerElement={<div className={css(styles.map)} />}
          mapElement={<div className={css(styles.mapElement)} />}
          center={{
            lat: infos.latitude,
            lng: infos.longitude,
          }}
          frames={frames}
          time={this.state.time}
        />
        <div className={css(styles.overlay)}>
          <div className={css(styles.overlayItem)}>
            <FontIcon className="fa fa-plane" color="white" />
            {` ${frames[this.state.time].flycState || '-'}`}
          </div>
          <div className={css(styles.overlayItem)}>
            <FontIcon className="fa fa-signal" color="white" />
            {` ${frames[this.state.time].gpsNum || '-'}`}
          </div>
          <BatteryIndicator
            className={css(styles.overlayItem)}
            percentage={frames[this.state.time].relativeCapacity}
            color="white"
          />
        </div>
        <Paper>
          <TimeControl startTime={0} endTime={frames.length - 1} onChange={this.handleOnChange} />
        </Paper>
      </div>
    );
  }
}

PositionContainer.propTypes = {
  infos: PropTypes.object.isRequired,
  frames: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  infos: state.data.infos,
  frames: state.data.frames,
});

export default connect(mapStateToProps)(PositionContainer);
