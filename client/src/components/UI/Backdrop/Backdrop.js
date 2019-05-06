import React from 'react';
import './Backdrop.css';

const backdrop = ({ show, clicked }) => (show ? <div className="Backdrop" onClick={clicked} role="presentation" /> : null);

export default backdrop;
