import React, { Component } from 'react';
import { Badge } from '@material-ui/core';
import { connect } from 'react-redux';
import openChat from '../../../assets/images/openChat.svg';
import close from '../../../assets/images/close.png';
import './Launcher.css';
import './Window.css';
import './Header.css';

class ChatWidget extends Component {
    state = {
      closed: true,
    }

    onClickHandler = () => {
      const { closed } = this.state;

      this.setState({ closed: !closed });
    }

    render() {
      const { children, count: { chat } } = this.props;
      const { closed } = this.state;

      const launcherClasses = ['ChatLauncher', 'Pointer'];
      let windowClasses = ['ChatWindow', 'closed'];

      if (!closed) {
        launcherClasses.push('Opened');
        windowClasses = ['ChatWindow', 'Closed'];
      }

      return (
        <div onClick={this.props.clicked}>
          <div className={launcherClasses.join(' ')} onClick={this.onClickHandler} role="presentation">
            <img className="OpenIcon" src={close} alt="close" />
            <Badge badgeContent={chat} color="secondary" invisible={!closed || chat === 0}>
              <img className="ClosedIcon" src={openChat} alt="open" />
            </Badge>
          </div>


          <div className={windowClasses.join(' ')}>
            <div className="ChatHeader">
              <div className="ChatHeaderTittle"> Chat </div>
              <div className="ChatHeaderCloseButton" onClick={this.onClickHandler} role="presentation">
                <img src={close} alt="close" />
              </div>
            </div>
            <div className="ChatBody">
              {children}
            </div>
          </div>
        </div>
      );
    }
}

const mapStateToProps = state => ({
  count: state.notif.count,
});

export default connect(mapStateToProps)(ChatWidget);
