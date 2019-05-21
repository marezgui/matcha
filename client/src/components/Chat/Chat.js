import React, { Component } from 'react';
import io from "socket.io-client";
import ChatWidget from 'components/UI/ChatWidget/ChatWidget';
import './Chat.css';

class Chat extends Component {
    state = {
      username: '',
      message: '',
      messages: [],
    }

    //socketFront = io('localhost:8080');

    render() {
      const { messages } = this.state;

      return (
        <ChatWidget>
          <div className="Messages">
            {messages.map(message => (
              <div>
                {`${message.author}: ${message.message}`}
              </div>
            ))}
          </div>
        </ChatWidget>
      );
    }
}

export default Chat;
