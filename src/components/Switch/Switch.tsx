import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

import Box from '../Box';

const HEIGHT = 16;
const WIDTH = 27;
const OFFSET = 1;
const LENGTH = HEIGHT - OFFSET * 2;

const Inner = styled(Box)`
  transition: left 0.2s ease;
`;

const Switch = React.forwardRef(
  (
    {
      checked,
      onClick = Function.prototype,
      onChange = Function.prototype,
      ...props
    },
    ref
  ) => (
    <Box
      as="button"
      type="button"
      role="switch"
      {...props}
      ref={ref}
      aria-checked={checked}
      position="relative"
      bg={checked ? 'tertiary' : 'primary'}
      height={HEIGHT}
      width={WIDTH}
      borderRadius={18}
      onClick={() => {
        onClick();
        onChange(!checked);
      }}
    >
      <Inner
        as="span"
        position="absolute"
        top="1px"
        left={
          checked ? `calc(100% - ${LENGTH}px - ${OFFSET}px)` : `${OFFSET}px`
        }
        height={LENGTH}
        width={LENGTH}
        borderRadius="50%"
        bg="white"
      />
    </Box>
  )
);

Switch.propTypes = {
  /** Determines whether the switch is on */
  checked: PropTypes.bool.isRequired,
};

/** @component */
export default Switch;
