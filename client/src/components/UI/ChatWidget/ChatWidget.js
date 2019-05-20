import React, { Component } from 'react';
import openChat from 'assets/images/openChat.svg';
import closeChat from 'assets/images/closeChat.png';
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

      let launcherClasses = ['ChatLauncher'];
      let windowClasses = ['ChatWindow', 'closed'];

      if (!closed) {
        launcherClasses = ['ChatLauncher', 'Opened'];
        windowClasses = ['ChatWindow', 'Closed'];
      }

      return (
        <div>
          <div className={launcherClasses.join(' ')} onClick={this.onClickHandler} role="presentation">
            <img className="OpenIcon" src={closeChat} alt="close" />
            <img className="ClosedIcon" src={openChat} alt="open" />
          </div>

          <div className={windowClasses.join(' ')}>
            <div className="ChatHeader">
              <img className="ChatHeaderImg" src="https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png" alt="" />
              <div className="ChatHeaderTittle"> Chat </div>
              <div className="ChatHeaderCloseButton" onClick={this.onClickHandler} role="presentation">
                <img src={closeChat} alt="close" />
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
