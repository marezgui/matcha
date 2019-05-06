import React from 'react';
import './Spinner.css';

const spinner = props => (
  <div className="Loader" {...props}>
    Loading...
  </div>
);

export default spinner;
