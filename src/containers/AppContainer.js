import React, { Component } from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import classNames from 'classnames';

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';

import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import Typography from 'material-ui/Typography';

import { withStyles } from 'material-ui/styles';

import Sidebar from '../components/Sidebar';
import DropZoneContainer from './DropZoneContainer';
import DashboardContainer from './DashboardContainer';
import PositionContainer from './PositionContainer';
import TelemetryContainer from './TelemetryContainer';
import BatteryContainer from './BatteryContainer';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 1,
    overflow: 'hidden',
  },
  appFrame: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100%',
  },
  appBar: {
    position: 'absolute',
    zIndex: theme.zIndex.navDrawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  content: {
    width: '100%',
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    height: 'calc(100% - 56px)',
    marginTop: 56,
    [theme.breakpoints.up('sm')]: {
      height: 'calc(100% - 64px)',
      marginTop: 64,
    },
  },
});

class AppContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { drawerOpen: true };

    this.handleDrawerToggle = this.handleDrawerToggle.bind(this);
  }

  handleDrawerToggle() {
    this.setState(state => ({ drawerOpen: !state.drawerOpen }));
  }

  render() {
    const { logFile, classes } = this.props;
    const { drawerOpen } = this.state;
    return (
      <div className={classes.root}>
        <div className={classes.appFrame}>
          <AppBar className={classNames(classes.appBar, drawerOpen && classes.appBarShift)}>
            <Toolbar disableGutters>
              <IconButton
                color="contrast"
                aria-label="open drawer"
                onClick={this.handleDrawerToggle}
                className={classes.menuButton}
              >
                <MenuIcon />
              </IconButton>
              <Typography type="title" color="inherit" noWrap>
                {logFile}
              </Typography>
            </Toolbar>
          </AppBar>
          <Sidebar open={drawerOpen} />
          <main className={classes.content}>
            {logFile ? (
              [
                <Route key="1" path="/" exact component={DashboardContainer} />,
                <Route key="2" path="/position" component={PositionContainer} />,
                <Route key="3" path="/telemetry" component={TelemetryContainer} />,
                <Route key="4" path="/battery" component={BatteryContainer} />,
              ]
            ) : (
              <DropZoneContainer />
            )}
          </main>
        </div>
      </div>
    );
  }
}

AppContainer.propTypes = {
  logFile: PropTypes.string,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  logFile: state.data.title ? state.data.title : null,
});

export default compose(
  withStyles(styles, { withTheme: true }),
  withRouter,
  connect(mapStateToProps),
)(AppContainer);
