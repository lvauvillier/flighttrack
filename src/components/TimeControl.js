import React, { PropTypes, Component } from 'react';
import { StyleSheet, css } from 'aphrodite';

import Slider from 'material-ui/Slider';
import IconButton from 'material-ui/IconButton';
import Play from 'material-ui/svg-icons/av/play-arrow';
import Pause from 'material-ui/svg-icons/av/pause';

const styles = StyleSheet.create({
  container: {
    height: 48,
    display: 'flex',
  },
  slider: {
    flex: 1,
  },
  time: {
    padding: 12,
  },
});

class TimeControl extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: props.startTime,
      isPlaying: false,
    };
    this.handlePlay = this.handlePlay.bind(this);
    this.handlePause = this.handlePause.bind(this);
    this.handleOnchange = this.handleOnchange.bind(this);
    this.getTimeStringValue = this.getTimeStringValue.bind(this);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  getTimeStringValue() {
    const totalSeconds = this.state.time / 10;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.round(totalSeconds - (minutes * 60));
    const pad = str => (`00${str}`).slice(-2);
    return `${pad(minutes)}:${pad(seconds)}`;
  }

  handlePlay() {
    this.setState({
      isPlaying: true,
    });
    this.timerID = setInterval(
      () => this.tick(),
      100,
    );
  }

  handlePause() {
    this.setState({
      isPlaying: false,
    });
    clearInterval(this.timerID);
  }

  handleOnchange(event, value) {
    this.setState({
      time: value,
    });
  }

  tick() {
    this.setState(prevState => ({
      time: prevState.time + 1,
    }));
  }

  render() {
    const { startTime, endTime } = this.props;
    return (
      <div className={css(styles.container)}>

        {
          this.state.isPlaying
          ? (
            <IconButton onClick={this.handlePause}>
              <Pause />
            </IconButton>
          ) : (
            <IconButton onClick={this.handlePlay}>
              <Play />
            </IconButton>
          )
        }

        <Slider
          className={css(styles.slider)}
          min={startTime}
          max={endTime}
          value={this.state.time}
          step={1}
          onChange={this.handleOnchange}
          sliderStyle={{ marginTop: 15 }}
        />
        <div className={css(styles.time)}>
          {this.getTimeStringValue()}
        </div>
      </div>
    );
  }
}

TimeControl.propTypes = {
  startTime: PropTypes.number,
  endTime: PropTypes.number,
};

export default TimeControl;
