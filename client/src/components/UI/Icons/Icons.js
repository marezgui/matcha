import React from 'react';
import { NavLink } from 'react-router-dom';
import { Badge, Avatar } from '@material-ui/core';
import logo from '../../../assets/images/matcha.png';
import './Icons.css';

export const Logo = props => (
  <div {...props}>
    <NavLink to="/people">
      <img alt="Logo" src={logo} className="Logo" />
    </NavLink>
  </div>
);

export const Menu = props => (
  <span className="Menu Icons" {...props}>
    <i className="fas fa-bars" />
  </span>
);

export const Chat = ({ badge }) => (
  <span className="Icons">
    <Badge badgeContent={badge} color="primary">
      <i className="far fa-envelope" />
    </Badge>
  </span>
);

export const Alert = ({ badge }) => (
  <span className="Icons">
    <Badge badgeContent={badge} color="primary">
      <i className="far fa-bell" />
    </Badge>
  </span>
);

export const Account = ({ name }) => (
  !name ? <Avatar style={{ backgroundColor: 'grey' }}> M </Avatar>
    : null // Here mini photo use Avatar with alt&src
);
