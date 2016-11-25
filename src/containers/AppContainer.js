import React, { PropTypes } from 'react';
import AppBar from 'material-ui/AppBar';
import spacing from 'material-ui/styles/spacing';
import { StyleSheet, css } from 'aphrodite';
import { connect } from 'react-redux';

import DrawerContainer from './DrawerContainer';
import { toggleDrawer } from '../actions/uiActions';

const styles = StyleSheet.create({
  appBar: {
    position: 'fixed !important',
    borderBottom: '1px solid #eee',
    paddingLeft: `${256 + spacing.desktopGutter}px`,
    '@media (max-width: 768px)': {
      paddingLeft: `${spacing.desktopGutter}px`,
    },
  },
});

const AppContainer = ({ smallScreen, dispatch }) => (
  <div>
    <AppBar
      showMenuIconButton={smallScreen}
      className={css(styles.appBar)}
      zDepth={0}
      onLeftIconButtonTouchTap={() => dispatch(toggleDrawer())}
    />
    <DrawerContainer />
  </div>
);

AppContainer.propTypes = {
  smallScreen: PropTypes.bool,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  smallScreen: state.browser.lessThan.medium,
  drawerOpened: state.ui.drawerOpened,
});

export default connect(
  mapStateToProps,
)(AppContainer);
