import React from 'react';
import MediaQuery from 'react-responsive';
import { Menu, Logo } from '../../UI/Icons/Icons';
import NavLinks from '../NavLinks/NavLinks';
import NavIcons from '../NavIcons/NavIcons';
import './Toolbar.scss';

const toolbar = ({ openSideDrawer }) => {

  return (
    <header className="Toolbar">
      <MediaQuery maxWidth={679}>
        <Menu onClick={openSideDrawer} />
      </MediaQuery>

      <Logo className="Logo" />

      <MediaQuery minWidth={680}>
        <nav>
          <NavLinks />
        </nav>

        <nav>
          <NavIcons />
        </nav>
      </MediaQuery>
    </header>
  );
};

export default toolbar;
