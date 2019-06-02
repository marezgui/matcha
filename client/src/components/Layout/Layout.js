import React, { Component } from 'react';
import io from 'socket.io-client';
import { connect } from 'react-redux';
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

    this.socket = io('localhost:8080', { transports: ['websocket'], upgrade: false });
    this.socket.emit('USER-LOGIN', userId);
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

export default connect(mapStateToProps)(Layout);
