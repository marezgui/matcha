import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { Alert, Account } from '../../UI/Icons/Icons';
import Dropdown from '../../UI/Dropdown/Dropdown';
import './NavIcons.scss';

class navIcons extends Component {
  state = {

  }

  render() {
    const { sideDrawerComponent, count: { alert },
      user: { firstName, lastName, photo } } = this.props;

    return (
      <ul className="NavIcons">
        <li>
          <NavLink to="/notifications">
            <Alert badge={alert} />
            {sideDrawerComponent && <span className="textIcons">Notifications</span> }
          </NavLink>
          {/* {!sideDrawerComponent && (
          <Dropdown>
            <p>Notifications</p>
            <p>Notifications</p>
          </Dropdown>
          )} */}
        </li>
        <li className={sideDrawerComponent && 'SideMyAccount'}>
          <NavLink to="/profile" className="sideProfile">
            <Account data={photo ? photo[photo.master] : firstName ? firstName[0] : null} />
            {sideDrawerComponent && (
            <span style={{ paddingLeft: '10px' }}>
              {(firstName && lastName) && `${firstName.charAt(0).toUpperCase() + firstName.slice(1)} ${lastName.charAt(0).toUpperCase() + lastName.slice(1)}`}
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
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  count: state.notif.count,
});

export default connect(mapStateToProps)(navIcons);
