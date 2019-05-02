import React from 'react'
import NavLinks from '../NavLinks/NavLinks';
import NavIcons from '../NavIcons/NavIcons';
import './SideDrawer.css'
import Backdrop from '../../UI/Backdrop/Backdrop'

const sideDrawer = (props) => {
    let attachedClasses = ['SideDrawer', 'Close']

    if (props.open) {
        attachedClasses = ['SideDrawer', 'Open']
    }

    return (
        <>
            <Backdrop show={props.open} clicked={props.closed}/>
            <div className={attachedClasses.join(' ')}>
                <NavLinks />
                <NavIcons />
            </div>
        </>
    )
}

export default sideDrawer