import React from 'react';
import { Menu, Logo } from '../../UI/Icons/Icons';
import NavLinks from '../NavLinks/NavLinks';
import NavIcons from '../NavIcons/NavIcons';
import './Toolbar.scss';

const toolbar = ({ openSideDrawer, isSideDrawerOpen }) => (
  <header className="Toolbar">
    <Menu onClick={openSideDrawer} />
    <Logo className="Logo" />

    <nav className="DesktopOnly">
      <NavLinks />
    </nav>

    <nav className="DesktopOnly">
      <NavIcons isSideDrawerOpen={isSideDrawerOpen} />
    </nav>
  </header>
);

export default toolbar;
