import React from 'react';
import PropTypes from 'prop-types';
import { Link, Route } from 'react-router-dom';
import { ListItem } from 'material-ui/List';

import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  active: {
    fontWeight: 'bold',
    backgroundColor: theme.palette.text.divider,
  },
});

const LinkListItem = ({
  to, activeOnlyWhenExact, classes, ...other
}) => (
  <Route path={to} exact={activeOnlyWhenExact}>
    {({ match }) => (
      <Link to={to}>
        <ListItem className={match ? classes.active : null} {...other} />
      </Link>
    )}
  </Route>
);

LinkListItem.propTypes = {
  to: PropTypes.string.isRequired,
  activeOnlyWhenExact: PropTypes.bool,
};

LinkListItem.defaultProps = {
  activeOnlyWhenExact: false,
};

export default withStyles(styles)(LinkListItem);
