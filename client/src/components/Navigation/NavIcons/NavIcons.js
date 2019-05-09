import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { Chat, Alert, Account } from '../../UI/Icons/Icons';
import Dropdown from '../../UI/Dropdown/Dropdown';
import './NavIcons.scss';

const navIcons = ({ sideDrawer, user }) => (
  <ul className="NavIcons">
    <li>
      <NavLink to="/">
        <Chat badge={1} />
        {sideDrawer && 'Messages' }
      </NavLink>
      {!sideDrawer && (
        <Dropdown>
          <p>Messages</p>
        </Dropdown>
      )}
    </li>
    <li>
      <NavLink to="/">
        <Alert badge={1} />
        {sideDrawer && 'Notifications' }
      </NavLink>
      {!sideDrawer && (
        <Dropdown>
          <p>Notifications</p>
          <p>Notifications</p>
        </Dropdown>
      )}
    </li>
    <li>
      <NavLink to="/profile">
        <Account data={user.firstName[0]} />
        {sideDrawer && user.firstName }
      </NavLink>
      {!sideDrawer && (
        <Dropdown>
          <NavLink to="/profile"> My Account </NavLink>
          <NavLink to="/logout"> Logout </NavLink>
        </Dropdown>
      )}
    </li>
  </ul>
);

const mapStateToProps = state => ({ user: state.auth.user });

export default connect(mapStateToProps)(navIcons);
