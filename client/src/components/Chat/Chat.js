import React, { Component } from 'react';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import ChatWidget from 'components/UI/ChatWidget/ChatWidget';
import './Chat.css';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      message: '',
      messages: [],
    };
    this.socket = io('localhost:8080');

    this.socket.emit('USER-LOGIN', { user: 'john' });

    const addMessage = (data) => {
      const { messages } = this.state;
      this.setState({ messages: [...messages, data] });
    };

    this.socket.on('RECEIVE_MESSAGE', (data) => {
      addMessage(data);
    });
  }

    sendMessage = (ev) => {
      ev.preventDefault();
      const { user } = this.props;
      const { username } = user;
      const { message } = this.state;
      const data = {
        username,
        message,
      };

      this.socket.emit('SEND_MESSAGE', data);
      this.setState({ message: '' });
    }

    render() {
      const { messages, message } = this.state;

      return (
        <ChatWidget>
          <div className="Messages">
            {messages.map((msg, id) => (
              <div key={id}>
                {`${msg.username}: ${msg.message}`}
              </div>
            ))}
          </div>
          <div className="footer">
            <br />
            <input type="text" placeholder="Message" className="form-control" value={message} onChange={ev => this.setState({ message: ev.target.value })} />
            <br />
            <button onClick={this.sendMessage} type="submit">Send</button>
          </div>
        </ChatWidget>
      );
    }
}

const mapStateToProps = state => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(Chat);
