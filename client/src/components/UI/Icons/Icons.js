import React from 'react';
import { NavLink } from 'react-router-dom';
import Badge from '@material-ui/core/Badge';
import logo from '../../../assets/images/matcha.png'
import './Icons.css'

export const Logo = (props) => (
    <div {...props}>
        <NavLink to="/people" >
            <img alt="Logo" src={logo} style={{ 'width': '250px', 'height': '60px', 'margin': '5px'}}/>
        </NavLink>
    </div>
)

export const Menu = (props) => (
    <span className="Menu Icons" {...props}>
        <i className="fas fa-bars"></i>
    </span>
)

export const Chat = (props) => (
    <span className="Icons" >
        <Badge badgeContent={props.badge} color="primary" > { /* variant="dot" */ }
            <i className="far fa-envelope"></i>
        </Badge>
    </span>
)

export const Alert = (props) => (
    <span className="Icons" >
        <Badge badgeContent={props.badge} color="primary">
            <i className="far fa-bell"></i>
        </Badge>
    </span>
)

export const Account = (props) => (
    <span className="Icons" >
        <i className="far fa-user-circle"></i>
    </span>
)