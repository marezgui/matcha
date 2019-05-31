import React from 'react';
import './Button.scss';

const button = ({ disabled, clicked, children }) => (
  <button className="Button" type="submit" disabled={disabled} onClick={clicked}>
    {children}
  </button>
);

export default button;
