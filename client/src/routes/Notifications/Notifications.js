import React, { Component } from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import axios from 'axios';
import * as actions from '../../store/actions/index';
import Notification from './Notification/Notification';
import './Notifications.css';

class Notifications extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    const connectionOptions = {
      Connection: 'Keep-Alive',
      Upgrade: 'websocket',
      'force new connection': true,
      reconnection: true,
      reconnectionDelay: 2000, // starts with 2 secs delay, then 4, 6, 8, until 60
      // where it stays forever until it reconnects
      reconnectionDelayMax: 60000, // 1 minute maximum delay between connections
      reconnectionAttempts: 'Infinity', // to prevent dead clients, having the user to having to manually reconnect after a server restart.
      timeout: 10000, // before connect_error and connect_timeout are emitted.
      transports: ['websocket'], // forces the transport to be only websocket. Server needs to be setup as well/
      // upgrade: false,
    };

    this.socket = io('localhost:8080', connectionOptions);
  }

  componentDidMount = () => {
    this._isMounted = true;
    const { token, onNotif } = this.props;
    const type = ['MATCHE', 'LIKE', 'UNLIKE', 'VUE', 'OTHER'];

    type.map(kind => (
      axios
        .get(`http://localhost:8080/api/notifchat/getnotifvue/${kind}`, { headers: { Authorization: `bearer ${token}` } })
        .then(() => {
          setTimeout(() => {
            onNotif(token);
          }, 500);
        })
        .catch(() => {
          // console.log(err.response);
        })
    ));
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  clearNotifList = () => {
    const { token, onNotif } = this.props;

    axios
      .delete('http://localhost:8080/api/notifchat/delnotif', { headers: { Authorization: `bearer ${token}` } })
      .then(() => {
        // console.log(res);
        setTimeout(() => {
          onNotif(token);
        }, 500);
      });
  }

  render() {
    const { notif, token } = this.props;
    const alert = notif.filter(el => (el[0].type !== 'NEWMESSAGE'));

    let notifications = (
      <>
        {alert.map(el => (
          <Notification
            key={el[0].idNotification}
            content={el[0]}
            token={token}
          />
        ))}
      </>
    );

    if (!alert.length) {
      notifications = (<p> no notifications  </p>);
    }
    // console.log(notif);

    return (
      <section className="Notifications">
        <section className="NotificationsList">
          <div className="NotificationsListHeader">
            <p>
              <strong> Notifications </strong>
            </p>
            <p>
              <span className="Pointer" onClick={this.clearNotifList} role="presentation">
                <span style={{ fontSize: '0.9em' }}>
                  <i className="far fa-times-circle" />
                </span>
                {' '}
                Clear
              </span>
            </p>
          </div>
          <div className="NotificationsListBody">
            {notifications}
          </div>
        </section>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  notif: state.notif.notifications,
  token: state.auth.token,
});

const mapDispatchToProps = dispatch => ({
  onNotif: token => dispatch(actions.getNotif(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
