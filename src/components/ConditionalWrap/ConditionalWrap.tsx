import React from 'react';
import PropTypes from 'prop-types';

/** @visibleName Conditional Wrap */
const ConditionalWrap = ({ condition, children, wrap }) =>
  condition ? React.cloneElement(wrap(children)) : children;

ConditionalWrap.propTypes = {
  /** The condition to pass for `children` to be wrappe */
  condition: PropTypes.bool.isRequired,
  /** ender prop with `children` as the only argument. Invoked when the `condition` is true */
  wrap: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

/** @component */
export default ConditionalWrap;
