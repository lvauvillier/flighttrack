import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'material-ui/Icon';

const BatteryIcon = ({ percentage, ...other }) => {
  if (percentage > 75) {
    return <Icon {...other} className="fa fa-battery-full" />;
  } else if (percentage > 50 && percentage <= 75) {
    return <Icon {...other} className="fa fa-battery-three-quarters" />;
  } else if (percentage > 25 && percentage <= 50) {
    return <Icon {...other} className="fa fa-battery-half" />;
  } else if (percentage > 10 && percentage <= 25) {
    return <Icon {...other} className="fa fa-battery-quarter" />;
  }
  return <Icon {...other} className="fa fa-battery-empty" />;
};

BatteryIcon.propTypes = {
  percentage: PropTypes.number,
};

export default BatteryIcon;
