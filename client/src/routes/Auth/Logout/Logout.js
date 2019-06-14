import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import * as actions from '../../../store/actions';

class Logout extends React.Component {
  componentDidMount() {
    this._isMounted = true;
    const { onLogout, user: { idUser } } = this.props;
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
    this.socket.emit('USER-LOGOUT', idUser);
    onLogout();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return <Redirect to="/" />;
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
});

const mapDispatchToProps = dispatch => ({
  onLogout: () => dispatch(actions.logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
