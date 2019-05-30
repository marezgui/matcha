import React, { Component } from 'react';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import './Layout.css';

class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSideDrawer: false,
    };
    const { user: { idUser } } = this.props;
    const userId = idUser;

    this.socket = io('localhost:8080');
    this.socket.emit('USER-LOGIN', userId);
    this.socket = io({ transports: ['websocket'], upgrade: false });
  }

  sideDrawerClosedHandler = () => {

    this.setState({ showSideDrawer: false });
  };

  openSideDrawerHandler = () => {
    this.setState(prevState => ({ showSideDrawer: !prevState.showSideDrawer }));
  };

  render() {
    const { showSideDrawer } = this.state;
    const { children } = this.props;

    return (
      <>
        <Toolbar openSideDrawer={this.openSideDrawerHandler} />
        <SideDrawer open={showSideDrawer} closed={this.sideDrawerClosedHandler} />

        <section className="Content">
          {children}
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
