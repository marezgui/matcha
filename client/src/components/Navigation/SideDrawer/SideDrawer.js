import React from 'react';
import NavLinks from '../NavLinks/NavLinks';
import NavIcons from '../NavIcons/NavIcons';
import Backdrop from '../../UI/Backdrop/Backdrop';
import './SideDrawer.css';

const sideDrawer = ({ open, closed }) => {
  let attachedClasses = ['SideDrawer', 'Close'];

  if (open) {
    attachedClasses = ['SideDrawer', 'Open'];
  }

  return (
    <>
      <Backdrop show={open} clicked={closed} />
      <div className={attachedClasses.join(' ')}>
        <NavLinks />
        <NavIcons />
      </div>
    </>
  );
};

export default sideDrawer;
