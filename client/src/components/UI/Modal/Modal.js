import React from 'react';
import close from 'assets/images/close.png';
import './Modal.css';

const modal = ({ children, clicked }) => (
  <div className="Modal">
    <div className="ModalHeader">
      <img className="ModalHeaderImg" src="https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png" alt="" />
      <div className="ModalHeaderTittle"> Chat </div>
      <div className="ModalHeaderCloseButton" onClick={clicked} role="presentation">
        <img src={close} alt="close" />
      </div>
    </div>
    <div className="ModalContent">
      {children}
    </div>
  </div>
);

export default modal;
