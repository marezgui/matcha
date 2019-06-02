import React, { Component } from 'react';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import Chat from '../Chat/Chat';
import './Layout.css';

class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSideDrawer: false,
    };
    const { user: { idUser } } = this.props;
    const userId = idUser;

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
    this.socket.emit('USER-LOGIN', userId);
    this.socket.on('RELOAD-NOTIFICATION-FOR', (id) => {
      // console.log(id);
      if (id === idUser) {
        if (this._isMounted) { this.updateNofication(); }
      }
    });
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  updateNofication = () => {
    const { onNotif, token } = this.props;

    console.log('notif+');
    onNotif(token);
  }

  sideDrawerClosedHandler = () => {
    this.setState({ showSideDrawer: false });
  };

  openSideDrawerHandler = () => {
    this.setState(prevState => ({ showSideDrawer: !prevState.showSideDrawer }));
  };

  render() {
    const { showSideDrawer } = this.state;
    const { children, user: { userIsComplete } } = this.props;

    return (
      <>
        <Toolbar openSideDrawer={this.openSideDrawerHandler} />
        <SideDrawer open={showSideDrawer} closed={this.sideDrawerClosedHandler} />

        <section className="Content">
          {children}
          {userIsComplete && (<Chat />)}
        </section>
      </>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  token: state.auth.token,
});

const mapDispatchToProps = dispatch => ({
  onNotif: token => dispatch(actions.getNotif(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
