import React from 'react';
import NavLinks from '../NavLinks/NavLinks';
import NavIcons from '../NavIcons/NavIcons';
import { Menu, Logo } from '../../UI/Icons/Icons';
import './Toolbar.scss';

const toolbar = (props) => (
    <header className="Toolbar">
        <Menu onClick={props.openSideDrawer}/>
        <Logo className="Logo"/>

        <nav className="DesktopOnly">
            <NavLinks />
        </nav>

        <nav className="DesktopOnly">
            <NavIcons isSideDrawerOpen={props.isSideDrawerOpen} />
        </nav>
    </header>
)

export default toolbar