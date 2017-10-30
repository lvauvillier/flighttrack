import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, css } from 'aphrodite';
import Dropzone from 'react-dropzone';
import Masonry from 'react-masonry-component';

import Paper from 'material-ui/Paper';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import UploadIcon from 'material-ui/svg-icons/file/file-upload';

import Container from '../components/Container';
import { addFlightLogData } from '../actions/dataActions';
import parser from '../utils/parser';
import { distance, date, timedelta, speed } from '../utils/units';

const styles = StyleSheet.create({
  button: {
    position: 'fixed',
    bottom: '24px',
    right: '24px',
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  item: {
    width: '50%',
    '@media (max-width: 992px)': {
      width: '100%',
    },
  },
  paper: {
    margin: 10,
    color: '#f7f7f7',
  },
});

class DashboardContainer extends Component {
  constructor(props) {
    super(props);
    this.handleOnDrop = this.handleOnDrop.bind(this);
  }

  handleOnDrop(files) {
    const { dispatch } = this.props;
    parser(files[0], (data) => {
      dispatch(addFlightLogData(data));
    });
  }

  render() {
    const { infos } = this.props;
    return (
      <Container>
        <Masonry
          options={{ transitionDuration: 0 }}
        >
          <div className={css(styles.item)}>
            <Paper className={css(styles.paper)}>
              <List>
                <Subheader>AIRCRAFT</Subheader>
                <ListItem
                  disabled
                  primaryText="Name"
                  secondaryText={infos.aircraftName}
                />
                <ListItem
                  disabled
                  primaryText="Type"
                  secondaryText={infos.droneType}
                />
              </List>
            </Paper>
          </div>
          <div className={css(styles.item)}>
            <Paper className={css(styles.paper)}>
              <List>
                <Subheader>FLIGHT</Subheader>
                <ListItem
                  disabled
                  primaryText="Date"
                  secondaryText={date(infos.updateTime)}
                />
                <ListItem
                  disabled
                  primaryText="Distance"
                  secondaryText={distance(infos.totalDistance, false)}
                />
                <ListItem
                  disabled
                  primaryText="Flight Time"
                  secondaryText={timedelta(infos.totalTime)}
                />
              </List>
            </Paper>
          </div>
          <div className={css(styles.item)}>
            <Paper className={css(styles.paper)}>
              <List>
                <Subheader>LOCATION</Subheader>
                <ListItem
                  disabled
                  primaryText="Area"
                  secondaryText={`${infos.city} ${infos.area}`}
                />
                <ListItem
                  disabled
                  primaryText="City"
                  secondaryText={infos.subStreet}
                />
              </List>
            </Paper>
          </div>
          <div className={css(styles.item)}>
            <Paper className={css(styles.paper)}>
              <List>
                <Subheader>LIMITS</Subheader>
                <ListItem
                  disabled
                  primaryText="Max. Height"
                  secondaryText={distance(infos.maxHeight, false)}
                />
                <ListItem
                  disabled
                  primaryText="Max. Horizontal Speed"
                  secondaryText={speed(infos.maxHSpeed, false)}
                />
                <ListItem
                  disabled
                  primaryText="Max. Vertical Speed"
                  secondaryText={speed(infos.maxVSpeed, false)}
                />
              </List>
            </Paper>
          </div>
          <div className={css(styles.item)}>
            <Paper className={css(styles.paper)}>
              <List>
                <Subheader>APP</Subheader>
                <ListItem
                  disabled
                  primaryText="Device"
                  secondaryText={infos.appType}
                />
                <ListItem
                  disabled
                  primaryText="Version"
                  secondaryText={infos.appVersion}
                />
              </List>
            </Paper>
          </div>
        </Masonry>
        <Dropzone
          className={css(styles.button)}
          onDrop={this.handleOnDrop}
          multiple={false}
          accept=".txt"
        >
          <FloatingActionButton>
            <UploadIcon />
          </FloatingActionButton>
        </Dropzone>
      </Container>
    );
  }
}

DashboardContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  infos: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  infos: state.data.infos,
});

export default connect(
  mapStateToProps,
)(DashboardContainer);
