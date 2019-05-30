import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import io from 'socket.io-client';
import Button from 'components/UI/Button/Button';
import './Messages.css';

class Messages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      toSend: '',
    };
    this.socket = io('localhost:8080');
    this.socket.on('RECEIVE_MESSAGE', (data) => {
      // console.log('receive', data);
      const { idMatche } = this.props;
      if (data.matcheId === idMatche) {
        const { messages } = this.state;
        this.setState({ messages: messages.concat(data) });
      }
    });
  }

  componentDidMount() {
    const { idMatche, token } = this.props;
    const headers = { headers: { Authorization: `bearer ${token}` } };

    // console.log(idMatche);

    axios
      .get(`notifchat/getmesageofmatche/${idMatche}`, headers)
      .then((res) => {
        this.setState({ messages: res.data.resultMessage });
        // console.log(res.data);
      });
  }

    handleInput = (e) => {
      const { value } = e.target;
      this.setState({ toSend: value });
    }

    sendMessage = (e) => {
      e.preventDefault();
      const { idMatche, user: { idUser } } = this.props;
      const { toSend } = this.state;
      if (toSend !== '') {
        const data = {
          matcheId: idMatche,
          sendUserId: idUser,
          message: toSend,
        };
        this.socket.emit('SEND_MESSAGE', data);
        this.socket.emit('NEW-NOTIFICATION');
        this.setState({ toSend: '' });
      }
    }

    render() {
      const { back, idMatche, user: { idUser } } = this.props;
      const { messages, toSend } = this.state;
      const senderClasses = ['Sender'];
      const receiverClasses = ['Receiver'];

      return (
        <div className="Messages">
          <div className="MessagesHeader">
            <p onClick={back} className="Pointer"> Back </p>
          </div>
          <div className="MessagesBody">
            <div>
              {messages.map(({ idMessage, sendUserId, message, date }) => (
                <p
                  key={idMessage || Math.random()} // REMOVE RANDOM
                  className={idUser === sendUserId ? senderClasses : receiverClasses}
                >
                  {`${message}`}
                </p>
              ))}
            </div>
          </div>
          <div className="MessagesFooter">
            <form>
              <div className="MessagesInput">
                <input type="text" value={toSend} onChange={this.handleInput} />
              </div>
              <div className="MessagesSend">
                <Button clicked={this.sendMessage}>
                  Send
                </Button>
              </div>
            </form>
          </div>
        </div>
      );
    }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  token: state.auth.token,
});

export default connect(mapStateToProps)(Messages);
