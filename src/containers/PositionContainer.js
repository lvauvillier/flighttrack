import React, { PropTypes, Component } from 'react';
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
    const { details, frames } = this.props;
    return (
      <div style={styles.container}>
        <Map
          containerElement={<div style={styles.map} />}
          mapElement={<div style={styles.mapElement} />}
          center={{
            lat: details.latitude,
            lng: details.longitude,
          }}
          frames={frames}
          time={this.state.time}
        />
        <Paper>
          <TimeControl
            startTime={0}
            endTime={frames.length}
            onChange={this.handleOnChange}
          />
        </Paper>
      </div>
    );
  }
}

PositionContainer.propTypes = {
  details: PropTypes.object.isRequired,
  frames: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  details: state.data.details,
  frames: state.data.frames,
});

export default connect(
  mapStateToProps,
)(PositionContainer);
