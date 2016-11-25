import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { ListItem } from 'material-ui/List';

const LinkListItem = ({ to, activeStyle, activeOnlyWhenExact, style, onTouchTap, ...other }) => (
  <Link
    to={to}
    activeOnlyWhenExact={activeOnlyWhenExact}
  >
    {
      ({ onClick, isActive }) => (
        <ListItem
          onClick={
            (...args) => {
              onTouchTap(...args);
              onClick(...args);
            }
          }
          style={isActive ? { ...activeStyle, ...style } : style}
          {...other}
        />
      )
    }
  </Link>
);

LinkListItem.propTypes = {
  to: PropTypes.string.isRequired,
  style: PropTypes.object,
  activeStyle: PropTypes.object,
  activeOnlyWhenExact: PropTypes.bool.isRequired,
  onTouchTap: PropTypes.func.isRequired,
};

LinkListItem.defaultProps = {
  activeStyle: {},
  style: {},
  activeOnlyWhenExact: false,
  onTouchTap: () => {},
};

export default LinkListItem;
