import React, { PropTypes } from 'react';
import AppBar from 'material-ui/AppBar';
import spacing from 'material-ui/styles/spacing';
import { StyleSheet, css } from 'aphrodite';
import { connect } from 'react-redux';

import DrawerContainer from './DrawerContainer';
import DropZoneContainer from './DropZoneContainer';
import { toggleDrawer } from '../actions/uiActions';

const styles = StyleSheet.create({
  appBar: {
    position: 'fixed !important',
    paddingLeft: `${256 + spacing.desktopGutter}px`,
    '@media (max-width: 768px)': {
      paddingLeft: `${spacing.desktopGutter}px`,
    },
  },
  content: {
    position: 'fixed',
    top: spacing.desktopKeylineIncrement,
    bottom: 0,
    right: 0,
    left: 0,
    fontFamily: '"Open Sans", sans-serif',
    color: '#3A4145',
    paddingLeft: 256,
    '@media (max-width: 768px)': {
      paddingLeft: 0,
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
    <div className={css(styles.content)}>
      <DropZoneContainer />
    </div>
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
