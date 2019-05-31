import React from 'react';
import close from '../../../assets/images/close.png';
import './Modal.css';

const modal = ({ title, children, clicked }) => (
  <div className="Modal">
    <div className="ModalHeader">
      <div className="ModalHeaderIcon">
        <i className="far fa-address-card" />
      </div>
      <div className="ModalHeaderTittle">
        {title}
      </div>
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
