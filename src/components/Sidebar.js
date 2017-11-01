import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Icon from 'material-ui/Icon';
import List, { ListItemIcon, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Drawer from 'material-ui/Drawer';
import Typography from 'material-ui/Typography';

import { withStyles } from 'material-ui/styles';

import LinkListItem from '../components/LinkListItem';

const drawerWidth = 240;

const styles = theme => ({
  drawerPaper: {
    backgroundColor: '#f5f5f5 ',
    border: 'none',
    position: 'relative',
    height: '100%',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    width: 52,
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  drawerInner: {
    // Make the items inside not wrap when transitioning:
    width: drawerWidth,
  },
  drawerHeader: {
    backgroundColor: theme.palette.primary[500],
    color: theme.palette.getContrastText(theme.palette.primary[500]),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
});

const Sidebar = ({ classes, open }) => (
  <Drawer
    type="permanent"
    open={open}
    classes={{
      paper: classNames(classes.drawerPaper, !open && classes.drawerPaperClose),
    }}
  >
    <div className={classes.drawerInner}>
      <div className={classes.drawerHeader}>
        <Typography type="title" color="inherit">
          FlightTrack
        </Typography>
      </div>
    </div>
    <Divider />
    <List>
      <LinkListItem button to="/" activeOnlyWhenExact>
        <ListItemIcon>
          <Icon className="fa fa-th-large" style={{ fontSize: 24 }} />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </LinkListItem>
      <LinkListItem button to="/position">
        <ListItemIcon>
          <Icon className="fa fa-map-marker" style={{ fontSize: 24 }} />
        </ListItemIcon>
        <ListItemText primary="Position" />
      </LinkListItem>
    </List>
  </Drawer>
);

Sidebar.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
};

export default withStyles(styles)(Sidebar);
