import React from 'react';
import NavLinks from '../NavLinks/NavLinks';
import NavIcons from '../NavIcons/NavIcons';
import { Menu, Logo } from '../../UI/Icons/Icons';
import './Toolbar.scss';

const toolbar = (props) => (
    <header class="Toolbar">
        <Menu className="Menu" onClick={props.openSideDrawer}/>
        <Logo className="Logo"/>

        <nav className="DesktopOnly">
            <NavLinks />
        </nav>

        <nav className="DesktopOnly">
            <NavIcons />
        </nav>
    </header>
)

export default toolbar