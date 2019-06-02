import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import { Alert, Account } from '../../UI/Icons/Icons';
import Dropdown from '../../UI/Dropdown/Dropdown';
import './NavIcons.scss';

class navIcons extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.socket = io('localhost:8080', { transports: ['websocket'], upgrade: false });
    this.socket.on('RELOAD-NOTIFICATION-FOR', (id) => {
      console.log(id);
      const { user: { idUser } } = this.props;
      if (id === idUser) {
        this.updateNoficationBadge();
      }
    });
  }

  updateNoficationBadge = () => {
    const { notifications } = this.state;
    this.setState({ notifications: notifications + 1 });
  }

  render() {
    const { sideDrawerComponent, notif,
      user: { firstName, lastName, photo, photo: { master } } } = this.props;
    let notifications = 0;
    if (notif !== null) {
      notif.forEach((el) => {
        if (el[0].type !== 'NEWMESSAGE' && !el[0].vue) {
          notifications += 1;
        }
      });
    }
    return (
      <ul className="NavIcons">
        <li>
          <NavLink to="/notifications">
            <Alert badge={notifications} />
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
  }
}

const mapStateToProps = state => ({ user: state.auth.user, notif: state.notif.notifications });

export default connect(mapStateToProps)(navIcons);
