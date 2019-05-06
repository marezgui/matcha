import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavLinks.scss';

const navLinks = () => (
  <ul className="NavLinks">
    <li>
      <NavLink to="/people" activeClassName="active"> People </NavLink>
    </li>
    <li>
      <NavLink exact to="" activeClassName="active"> Match </NavLink>
    </li>
  </ul>
);

export default navLinks;
