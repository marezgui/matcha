import React, { Component } from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import axios from 'axios';
import Notification from './Notification/Notification';
import './Notifications.css';

class Notifications extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    this.socket = io('localhost:8080', { transports: ['websocket'], upgrade: false });
  }

  componentDidMount = () => {
    const { token } = this.props;

    axios // notif vue
      .get('http://localhost:8080/api/notifchat//getnotifvue/MATCHE', { headers: { Authorization: `bearer ${token}` } })
      .then((res) => { console.log(res); })
      .catch((err) => { console.log(err.response); });
  }

  render() {
    const { notif, token } = this.props;

    // console.log(notif);

    return (
      <section className="Notifications">
        <section className="NotificationsList">
          <div className="NotificationsListHeader">
            <p>
              <strong> Notifications </strong>
            </p>
            <p>
              <span className="Pointer">
                <span style={{ fontSize: '0.9em' }}>
                  <i className="far fa-times-circle" />
                </span>
                {' '}
                Clear
              </span>
            </p>
          </div>
          <div className="NotificationsListBody">
            {notif.filter(el => (el[0].type !== 'NEWMESSAGE')).map(el => (
              <Notification
                key={el[0].idNotification}
                content={el[0]}
                token={token}
              />
            ))}
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

export default connect(mapStateToProps)(Notifications);
