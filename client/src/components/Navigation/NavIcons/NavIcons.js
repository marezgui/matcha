import React from 'react';
import { NavLink } from 'react-router-dom';
import { Chat, Alert, Account } from '../../UI/Icons/Icons';
import Dropdown from '../../UI/Dropdown/Dropdown'
import './NavIcons.scss'

const navItems = (props) => (
    <ul className="NavIcons">
        <li>
            <NavLink to="/">
                <Chat badge={1}/>
            </NavLink>
            {!props.isSideDrawerOpen
                &&
                <Dropdown>
                    <p>Messages</p>
                </Dropdown> 
            }
        </li>
        <li>
            <NavLink to="/">
                <Alert badge={1}/>
            </NavLink>
            {!props.isSideDrawerOpen 
                && 
                <Dropdown>
                    <p>Notifications</p>
                    <p>Notifications</p>
                </Dropdown>
            }
        </li>
        <li>
            <NavLink to="/profile">
                <Account/>
            </NavLink>
            {!props.isSideDrawerOpen 
                && 
                <Dropdown>
                    <NavLink to='/profile'> My Account </NavLink>
                    <NavLink to='/logout'> Logout </NavLink>
                </Dropdown>
            }
        </li>
    </ul>
)

export default navItems;