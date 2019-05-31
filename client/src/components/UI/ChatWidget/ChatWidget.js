import React, { Component } from 'react';
import { Badge } from '@material-ui/core';
import openChat from '../../../assets/images/openChat.svg';
import close from '../../../assets/images/close.png';
import './Launcher.css';
import './Window.css';
import './Header.css';

class Chat extends Component {
    state = {
      closed: true,
    }

    onClickHandler = () => {
      const { closed } = this.state;

      this.setState({ closed: !closed });
    }

    render() {
      const { children } = this.props;
      const { closed } = this.state;

      const launcherClasses = ['ChatLauncher', 'Pointer'];
      let windowClasses = ['ChatWindow', 'closed'];

      if (!closed) {
        launcherClasses.push('Opened');
        windowClasses = ['ChatWindow', 'Closed'];
      }

      return (
        <div>
          <div className={launcherClasses.join(' ')} onClick={this.onClickHandler} role="presentation">
            <img className="OpenIcon" src={close} alt="close" />
            <Badge badgeContent={10} color="secondary" invisible={!closed}>
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

export default Chat;
