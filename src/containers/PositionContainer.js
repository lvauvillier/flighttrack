import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import Paper from 'material-ui/Paper';

import Map from '../components/Map';
import TimeControl from '../components/TimeControl';

const styles = {
  container: {
    height: '100%',
  },
  map: {
    height: 'calc(100% - 48px)',
  },
  mapElement: {
    height: '100%',
  },
};

const PositionContainer = ({ details, frames }) => (
  <div style={styles.container}>
    <Map
      containerElement={<div style={styles.map} />}
      mapElement={<div style={styles.mapElement} />}
      center={{
        lat: details.latitude,
        lng: details.longitude,
      }}
    />
    <Paper>
      <TimeControl
        startTime={frames.start}
        endTime={frames.end}
      />
    </Paper>
  </div>
);

PositionContainer.propTypes = {
  details: PropTypes.object.isRequired,
  frames: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  details: state.data.details,
  frames: state.data.frames,
});

export default connect(
  mapStateToProps,
)(PositionContainer);
