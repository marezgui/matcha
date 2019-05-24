import React from 'react';
import { NavLink } from 'react-router-dom';
import { People, Dashborad } from 'components/UI/Icons/Icons';
import './NavLinks.scss';

const navLinks = ({ sideDrawerComponent }) => (
  <ul className="NavLinks">
    <li>
      <NavLink to="/people" activeClassName="active">
        {sideDrawerComponent && <People />}
        <span className="textLinks">People</span>
      </NavLink>
    </li>
  </ul>
);

export default navLinks;
