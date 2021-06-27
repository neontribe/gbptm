import React from 'react';
import propTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import AnimatedNumber from 'react-animated-number';

function Counter({ icon, value, label }) {
  var iconCopy = React.cloneElement(icon, {
    style: {
      height: 140,
      width: 140,
      opacity: 0.8,
    },
    color: 'secondary',
  });

  return (
    <Paper
      style={{
        height: 180,
        width: 150,
        margin: 20,
        textAlign: 'center',
        display: 'inline-block',
        position: 'relative',
      }}
    >
      {iconCopy}
      <span
        style={{
          position: 'absolute',
          top: 50,
          fontWeight: 'bold',
          left: 15,
        }}
      >
        <AnimatedNumber
          stepPrecision={0}
          duration={500}
          style={{
            fontSize: 44,
            transition: '0.8s ease-out',
            transitionProperty: 'background-color, color, opacity',
          }}
          frameStyle={(perc) => (perc === 100 ? {} : { opacity: 0.25 })}
          value={value}
        />
      </span>
      <strong>{label}</strong>
    </Paper>
  );
}

Counter.propTypes = {
  icon: propTypes.element,
  value: propTypes.number,
  label: propTypes.string,
};

export default Counter;
