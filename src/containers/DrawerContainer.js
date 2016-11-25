import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import Drawer from 'material-ui/Drawer';
import FontIcon from 'material-ui/FontIcon';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import { List, ListItem } from 'material-ui/List';
import { spacing, typography } from 'material-ui/styles';

import { toggleDrawer } from '../actions/uiActions';
import theme from '../theme';

const styles = {
  drawer: {
    borderRight: '1px solid #eee',
  },
  logo: {
    display: 'block',
    textDecoration: 'none',
    fontSize: 24,
    color: typography.textFullWhite,
    lineHeight: `${spacing.desktopKeylineIncrement}px`,
    fontWeight: typography.fontWeightLight,
    backgroundColor: theme.palette.primary1Color,
    paddingLeft: spacing.desktopGutter,
    marginBottom: 8,
  },
  logoIcon: {
    color: typography.textFullWhite,
    marginRight: 15,
  },
};

const DrawerContainer = ({ smallScreen, drawerOpened, dispatch }) => (
  <Drawer
    open={!smallScreen || drawerOpened}
    onRequestChange={() => dispatch(toggleDrawer())}
    docked={!smallScreen}
    zDepth={0}
    containerStyle={styles.drawer}
  >
    <div style={styles.logo}>
      <FontIcon
        className="fa fa-paper-plane-o"
        style={styles.logoIcon}
      />
      Flight Track
    </div>
    <List>
      <ListItem
        primaryText="Dashboard"
        leftIcon={
          <FontIcon
            className="fa fa-th-large"
          />
        }
      />
    </List>
    <Divider />
    <List>
      <Subheader>Details</Subheader>
      <ListItem
        primaryText="Position"
        leftIcon={
          <FontIcon
            className="fa fa-map-marker"
          />
        }
      />
      <ListItem
        primaryText="Telemetry"
        leftIcon={
          <FontIcon
            className="fa fa-tachometer"
          />
        }
      />
      <ListItem
        primaryText="Battery"
        leftIcon={
          <FontIcon
            className="fa fa-battery-full"
          />
        }
      />
    </List>
  </Drawer>
);

DrawerContainer.propTypes = {
  smallScreen: PropTypes.bool,
  drawerOpened: PropTypes.bool,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  smallScreen: state.browser.lessThan.medium,
  drawerOpened: state.ui.drawerOpened,
});

export default connect(
  mapStateToProps,
)(DrawerContainer);
