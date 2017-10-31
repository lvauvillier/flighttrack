import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import compose from 'recompose/compose';

import Paper from 'material-ui/Paper';
import Icon from 'material-ui/Icon';
import Typography from 'material-ui/Typography';

import { withStyles } from 'material-ui/styles';

import BatteryIcon from '../components/BatteryIcon';
import Map from '../components/Map';
import TimeControl from '../components/TimeControl';

const styles = {
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
};

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
    const { infos, frames, classes } = this.props;
    const percentage = frames[this.state.time].relativeCapacity;
    return (
      <div className={classes.container}>
        <Map
          containerElement={<div className={classes.map} />}
          mapElement={<div className={classes.mapElement} />}
          center={{
            lat: infos.latitude,
            lng: infos.longitude,
          }}
          frames={frames}
          time={this.state.time}
        />
        <Typography className={classes.overlay} type="subheading">
          <div className={classes.overlayItem}>
            <Icon color="contrast" className="fa fa-plane" />
            {` ${frames[this.state.time].flycState || '-'}`}
          </div>
          <div className={classes.overlayItem}>
            <Icon color="contrast" className="fa fa-signal" />
            {` ${frames[this.state.time].gpsNum || '-'}`}
          </div>
          <div className={classes.overlayItem}>
            <BatteryIcon percentage={percentage} color="contrast" />
            {percentage ? ` ${percentage}%` : ' N/A'}
          </div>
        </Typography>
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
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  infos: state.data.infos,
  frames: state.data.frames,
});

export default compose(withStyles(styles), connect(mapStateToProps))(PositionContainer);
