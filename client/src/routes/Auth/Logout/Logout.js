import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import * as actions from 'store/actions';

class Logout extends React.Component {
  componentDidMount() {
    const { onLogout, user: { idUser } } = this.props;
    this.socket = io('localhost:8080', { transports: ['websocket'], upgrade: false });
    this.socket.emit('USER-LOGOUT', idUser);
    onLogout();
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
