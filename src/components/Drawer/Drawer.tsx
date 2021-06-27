import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

import Box from '../Box';
import Portal from '../Portal';

const MENU_HEIGHT = 60; // px

const Drawer = ({ visible, animateFrom = 'left', ...props }) => {
  const animateTo = animateFrom === 'right' ? 'left' : 'right';

  const variants = {
    open: {
      display: 'block',
      [animateTo]: '0%',
    },
    closed: {
      [animateTo]: '100%',
      transitionEnd: {
        // avoids keyboard users being able to navigate to off-screen elements
        display: 'none',
      },
    },
  };

  return (
    <Portal>
      <Box
        as={motion.div}
        position="fixed"
        top={MENU_HEIGHT}
        {...{
          [animateTo]: 0,
        }}
        height={`calc(100vh - ${MENU_HEIGHT}px)`}
        width="100%"
        bg="white"
        p={3}
        zIndex={150}
        overflowY="auto"
        {...props}
        // motion props
        variants={variants}
        animate={visible ? 'open' : 'closed'}
        transition={{
          ease: 'easeInOut',
          duration: 0.3,
        }}
        initial={false}
      />
    </Portal>
  );
};

Drawer.propTypes = {
  /** Determines whether the drawer is on screen */
  visible: PropTypes.bool,
  /** Direction to animate from */
  animateFrom: PropTypes.oneOf(['left', 'right']),
};

Drawer.defaultProps = {
  animateFrom: 'right',
};

/** @component */
export default Drawer;
