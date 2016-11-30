import React, { PropTypes } from 'react';
import { Match } from 'react-router';
import { StyleSheet, css } from 'aphrodite';
import { connect } from 'react-redux';

import AppBar from 'material-ui/AppBar';
import spacing from 'material-ui/styles/spacing';

import DrawerContainer from './DrawerContainer';
import DropZoneContainer from './DropZoneContainer';
import DashboardContainer from './DashboardContainer';
import PositionContainer from './PositionContainer';
import TelemetryContainer from './TelemetryContainer';
import BatteryContainer from './BatteryContainer';

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

const AppContainer = ({ data, smallScreen, dispatch }) => (
  <div>
    <AppBar
      showMenuIconButton={smallScreen}
      className={css(styles.appBar)}
      zDepth={0}
      onLeftIconButtonTouchTap={() => dispatch(toggleDrawer())}
      title={data && data.title}
    />
    <div className={css(styles.content)}>
      {
        data ? (
          <div>
            <Match pattern="/" exactly component={DashboardContainer} />
            <Match pattern="/position" component={PositionContainer} />
            <Match pattern="/telemetry" component={TelemetryContainer} />
            <Match pattern="/battery" component={BatteryContainer} />
          </div>
        ) : (
          <DropZoneContainer />
        )
      }
    </div>
    <DrawerContainer />
  </div>
);

AppContainer.propTypes = {
  data: PropTypes.object,
  smallScreen: PropTypes.bool,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  data: state.data.frames ? state.data : null,
  smallScreen: state.browser.lessThan.medium,
});

export default connect(
  mapStateToProps,
)(AppContainer);
