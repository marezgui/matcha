import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { Chat, Alert, Account } from 'components/UI/Icons/Icons';
import Dropdown from 'components/UI/Dropdown/Dropdown';
import './NavIcons.scss';

// eslint-disable-next-line max-len
const navIcons = ({ sideDrawerComponent, user: { firstName, lastName, photo, photo: { master } } }) => (
  <ul className="NavIcons">
    <li>
      <NavLink to="/">
        <Chat badge={1} />
        {sideDrawerComponent && <span className="textIcons">Messages</span> }
      </NavLink>
      {!sideDrawerComponent && (
        <Dropdown>
          <p>Messages</p>
        </Dropdown>
      )}
    </li>
    <li>
      <NavLink to="/">
        <Alert badge={1} />
        {sideDrawerComponent && <span className="textIcons">Notifications</span> }
      </NavLink>
      {!sideDrawerComponent && (
        <Dropdown>
          <p>Notifications</p>
          <p>Notifications</p>
        </Dropdown>
      )}
    </li>
    <li className={sideDrawerComponent && 'SideMyAccount'}>
      <NavLink to="/profile" className="sideProfile">
        <Account data={photo[master] || firstName[0]} />
        {sideDrawerComponent && (
          <span style={{ paddingLeft: '10px' }}>
            {`${firstName.charAt(0).toUpperCase() + firstName.slice(1)} ${lastName.charAt(0).toUpperCase() + lastName.slice(1)}`}
          </span>
        )}
      </NavLink>
      {!sideDrawerComponent && (
        <Dropdown>
          <NavLink to="/profile"> My Account </NavLink>
          <NavLink to="/logout"> Logout </NavLink>
        </Dropdown>
      )}
      {sideDrawerComponent
        && <NavLink to="/logout" style={{ paddingTop: '10px' }}> Logout </NavLink>
      }
    </li>
  </ul>
);

const mapStateToProps = state => ({ user: state.auth.user });

export default connect(mapStateToProps)(navIcons);
