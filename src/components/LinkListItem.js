import React, { PropTypes } from 'react';
import { Link, Route } from 'react-router-dom';
import { ListItem } from 'material-ui/List';

const LinkListItem = ({ to, activeStyle, activeOnlyWhenExact, style, onTouchTap, ...other }) => {
  return (
    <Route
      path={to}
      exact={activeOnlyWhenExact}
    >
      {
        ({ match }) => (
          <Link
            to={to}
            onClick={onTouchTap}
          >
            <ListItem
              style={match ? { ...activeStyle, ...style } : style}
              {...other}
            />
          </Link>
        )
      }
    </Route>
  );
};

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
