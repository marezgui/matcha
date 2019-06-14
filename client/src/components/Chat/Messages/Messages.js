import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import io from 'socket.io-client';
import { Send } from '@material-ui/icons';
import './Messages.css';

class Messages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      toSend: '',
    };
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
    this.socket.on('RECEIVE_MESSAGE', (data) => {
      // console.log('receive', data);
      const { idMatche } = this.props;
      if (data.matcheId === idMatche) {
        const { messages } = this.state;
        if (this._isMounted) { this.setState({ messages: messages.concat(data) }); }
      }
    });
    this.msgRef = React.createRef();
  }

  componentDidMount() {
    this._isMounted = true;
    const { idMatche, token } = this.props;
    const headers = { headers: { Authorization: `bearer ${token}` } };

    // console.log(idMatche, usermatche);

    axios
      .get(`http://localhost:8080/api/notifchat/getmesageofmatche/${idMatche}`, headers)
      .then((res) => {

        if (this._isMounted) { this.setState({ messages: res.data.resultMessage }); }

        // console.log(res.data);
      });
  }

  componentDidUpdate() {
    // eslint-disable-next-line react/no-string-refs
    const el = this.refs.MessagesBody;
    el.scrollTop = el.scrollHeight;
  }

  componentWillUnmount() {
    this._isMounted = false;
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
    const { back, user: { idUser } } = this.props; // idMatche
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
        {/* eslint-disable-next-line react/no-string-refs */}
        <div className="MessagesBody" ref="MessagesBody">
          <div>
            {messages.map(({ idMessage, sendUserId, message }) => (
              // date is avaible / Remove Random
              <div className="MessageContainer" key={idMessage || Math.random()}>
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
