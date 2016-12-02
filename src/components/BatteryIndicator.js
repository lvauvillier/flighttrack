import React, { PropTypes } from 'react';
import FontIcon from 'material-ui/FontIcon';

const BatteryIndicator = ({ percentage, className, ...other }) => (
  <div className={className}>
    {
      percentage > 75 && (
        <FontIcon className="fa fa-battery-full" {...other} />
      )
    }
    {
      percentage > 50 && percentage <= 75 && (
        <FontIcon className="fa fa-battery-three-quarters" {...other} />
      )
    }
    {
      percentage > 25 && percentage <= 50 && (
        <FontIcon className="fa fa-battery-half" {...other} />
      )
    }
    {
      percentage > 10 && percentage <= 25 && (
        <FontIcon className="fa fa-battery-quarter" {...other} />
      )
    }
    {
      percentage > 0 && percentage <= 10 && (
        <FontIcon className="fa fa-battery-empty" {...other} />
      )
    }
    {
      !percentage && (
        <FontIcon className="fa fa-battery-empty" {...other} />
      )
    }
    {
      percentage ? ` ${percentage}%` : ' N/A'
    }
  </div>
);

BatteryIndicator.propTypes = {
  percentage: PropTypes.number,
  className: PropTypes.string,
};

export default BatteryIndicator;
