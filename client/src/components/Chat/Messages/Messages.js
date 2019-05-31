import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import io from 'socket.io-client';
import { Send } from '@material-ui/icons';
import Input from '../../UI/Input/Input';
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
        if (this._isMounted) {
          this.setState({ messages: messages.concat(data) });
        }
      }
    });
  }

  componentDidMount() {
    this._isMounted = true;
    const { idMatche, token } = this.props;
    const headers = { headers: { Authorization: `bearer ${token}` } };

    // console.log(idMatche, usermatche);

    axios
      .get(`http://localhost:8080/api/notifchat/getmesageofmatche/${idMatche}`, headers)
      .then((res) => {
        this.setState({ messages: res.data.resultMessage });
        // console.log(res.data);
      });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  componentDidUpdate() {
    // eslint-disable-next-line react/no-string-refs
    const el = this.refs.MessagesBody;
    el.scrollTop = el.scrollHeight;
  }

    handleInput = (e) => {
      const { value } = e.target;
      this.setState({ toSend: value });
    }

    emitNotification = () => {
      const { usermatche } = this.props;
      this.socket.emit('CREATE-NOTIFICATION', usermatche);
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
        this.setState({ toSend: '' });
        this.emitNotification();
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
            <p onClick={back} className="Pointer" style={{ paddingLeft: '2px' }}>
              <i className="far fa-arrow-alt-circle-left" />
              {' '}
              Back to conversations
            </p>
          </div>
          <div className="MessagesBody" ref="MessagesBody">
            <div>
              {messages.map(({ idMessage, sendUserId, message, date }) => (
                <div className="MessageContainer" key={idMessage || Math.random()}>
                  {' '}
                  {/* REMOVE RANDOM */}
                  <p className={idUser === sendUserId ? senderClasses : receiverClasses}>
                    {`${message}`}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="MessagesFooter">
            <form>
              <div className="MessagesInput">
                <input
                  className="InputMessage"
                  type="text"
                  value={toSend}
                  onChange={this.handleInput}
                />
              </div>
              <div className="MessagesSend">
                <button style={{ border: '0', backgroundColor: 'transparent' }} type="submit" onClick={this.sendMessage}>
                  <Send />
                </button>
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
