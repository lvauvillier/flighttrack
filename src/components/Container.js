import React from 'react';
import PropTypes from 'prop-types';

const style = {
  margin: 20,
};

const Container = ({ children }) => (
  <div style={style}>
    { children }
  </div>
);

Container.propTypes = {
  children: PropTypes.node,
};

export default Container;
