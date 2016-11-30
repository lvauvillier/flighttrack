import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import Drawer from 'material-ui/Drawer';
import FontIcon from 'material-ui/FontIcon';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import { List } from 'material-ui/List';
import { spacing, typography } from 'material-ui/styles';

import LinkListItem from '../components/LinkListItem';
import { toggleDrawer } from '../actions/uiActions';
import theme from '../theme';

const styles = {
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
  item: {
    color: '#919398',
  },
  activeItem: {
    fontWeight: 'bold',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
};

const DrawerContainer = ({ smallScreen, drawerOpened, dispatch }) => (
  <Drawer
    open={!smallScreen || drawerOpened}
    onRequestChange={() => dispatch(toggleDrawer())}
    docked={!smallScreen}
  >
    <div style={styles.logo}>
      <FontIcon
        className="fa fa-paper-plane-o"
        style={styles.logoIcon}
      />
      Flight Track
    </div>
    <List>
      <LinkListItem
        to="/"
        activeOnlyWhenExact
        primaryText="Dashboard"
        style={styles.item}
        activeStyle={styles.activeItem}
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
      <LinkListItem
        to="/position"
        primaryText="Position"
        style={styles.item}
        activeStyle={styles.activeItem}
        leftIcon={
          <FontIcon
            className="fa fa-map-marker"
          />
        }
      />
      <LinkListItem
        to="/telemetry"
        primaryText="Telemetry"
        style={styles.item}
        activeStyle={styles.activeItem}
        leftIcon={
          <FontIcon
            className="fa fa-tachometer"
          />
        }
      />
      <LinkListItem
        to="/battery"
        primaryText="Battery"
        style={styles.item}
        activeStyle={styles.activeItem}
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
