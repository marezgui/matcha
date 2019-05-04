import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../../assets/images/matcha.png'

const style = {'fontSize': '2em', 'color': 'rgb(202, 8, 19)'};

export const Logo = (props) => (
    <div {...props}>
        <NavLink to="/people" >
            <img alt="Logo" src={logo} style={{ 'width': '250px', 'height': '60px', 'margin': '5px'}}/>
        </NavLink>
    </div>
)

export const Menu = (props) => (
    <span style={style} {...props}>
        <i className="fas fa-bars"></i>
    </span>
)

export const Chat = (props) => (
    <span style={style} {...props}>
        <i className="fas fa-envelope"></i>
    </span>
)

export const Alert = (props) => (
    <span style={style} {...props}>
        <i className="fas fa-bell"></i>
    </span>
)

export const Account = (props) => (
    <span style={style} {...props}>
        <i className="far fa-user-circle"></i>
    </span>
)