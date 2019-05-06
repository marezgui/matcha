import React from 'react';
import './PasswordState.css';

const passwordState = ({ value }) => {
  let pwdWeak = false;
  let pwdMedium = false;
  let pwdStrong = false;

  if (0) { // Change the 0
    pwdWeak = true;
  } else if (value > 8) {
    pwdWeak = true;
    pwdMedium = true;
  } else if (value > 12) {
    pwdWeak = true;
    pwdMedium = true;
    pwdStrong = true;
  }

  return (
    <div className="password-state">
      <div className={`pwd pwd-weak ${pwdWeak ? 'show' : ''}`} />
      <div className={`pwd pwd-weak ${pwdMedium ? 'show' : ''}`} />
      <div className={`pwd pwd-weak ${pwdStrong ? 'show' : ''}`} />
    </div>
  );
};

export default passwordState;
