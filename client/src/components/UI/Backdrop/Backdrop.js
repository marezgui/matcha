import React from 'react';
import './Backdrop.css';

const backdrop = ({ show, clicked, mobile }) => {
  const attachedClasses = ['Backdrop'];

  if (mobile) attachedClasses.push('Mobile');

  return (show ? <div className={attachedClasses.join(' ')} onClick={clicked} role="presentation" /> : null);
};

export default backdrop;
