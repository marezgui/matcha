import React from 'react';
import './Button.scss';

const button = (props) => {
  const { disabled, clicked, children, style } = props;
  return (
    <button className="Button" type="submit" disabled={disabled} onClick={clicked} style={style}>
      {children}
    </button>
  );
};

export default button;
