import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import Masonry from 'react-masonry-component';

import Paper from 'material-ui/Paper';
import List, { ListItem, ListItemText } from 'material-ui/List';
import ListSubheader from 'material-ui/List/ListSubheader';

import { withStyles } from 'material-ui/styles';

import Container from '../components/Container';

import { addFlightLogData } from '../actions/dataActions';
import parser from '../utils/parser';
import { distance, date, timedelta, speed } from '../utils/units';

const styles = {
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
};

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
    const { infos, classes } = this.props;
    return (
      <Container>
        <Masonry options={{ transitionDuration: 0 }}>
          <div className={classes.item}>
            <Paper className={classes.paper}>
              <List subheader={<ListSubheader disableSticky>AIRCRAFT</ListSubheader>}>
                <ListItem>
                  <ListItemText primary="Name" secondary={infos.aircraftName} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Type" secondary={infos.droneType} />
                </ListItem>
              </List>
            </Paper>
          </div>
          <div className={classes.item}>
            <Paper className={classes.paper}>
              <List subheader={<ListSubheader disableSticky>FLIGHT</ListSubheader>}>
                <ListItem>
                  <ListItemText primary="Date" secondary={date(infos.updateTime)} />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Distance"
                    secondary={distance(infos.totalDistance, false)}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Flight Time" secondary={timedelta(infos.totalTime)} />
                </ListItem>
              </List>
            </Paper>
          </div>
          <div className={classes.item}>
            <Paper className={classes.paper}>
              <List subheader={<ListSubheader disableSticky>LOCATION</ListSubheader>}>
                <ListItem>
                  <ListItemText primary="Area" secondary={`${infos.city} ${infos.area}`} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="City" secondary={infos.subStreet} />
                </ListItem>
              </List>
            </Paper>
          </div>
          <div className={classes.item}>
            <Paper className={classes.paper}>
              <List subheader={<ListSubheader disableSticky>LIMITS</ListSubheader>}>
                <ListItem>
                  <ListItemText
                    primary="Max. Height"
                    secondary={distance(infos.maxHeight, false)}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Max. Horizontal Speed"
                    secondary={speed(infos.maxHSpeed, false)}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Max. Vertical Speed"
                    secondary={speed(infos.maxVSpeed, false)}
                  />
                </ListItem>
              </List>
            </Paper>
          </div>
          <div className={classes.item}>
            <Paper className={classes.paper}>
              <List subheader={<ListSubheader disableSticky>APP</ListSubheader>}>
                <ListItem>
                  <ListItemText primary="Device" secondary={infos.appType} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Version" secondary={infos.appVersion} />
                </ListItem>
              </List>
            </Paper>
          </div>
        </Masonry>
      </Container>
    );
  }
}

DashboardContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  infos: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  infos: state.data.infos,
});

export default compose(withStyles(styles), connect(mapStateToProps))(DashboardContainer);
