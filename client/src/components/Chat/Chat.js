import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import ChatWidget from 'components/UI/ChatWidget/ChatWidget';
import { Avatar } from '@material-ui/core';
import Messages from './Messages/Messages';
import './Chat.css';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      matches: [],
      clickedMatche: false,
    };
  }

  componentDidMount = () => {
    const { token } = this.props;
    const headers = { headers: { Authorization: `bearer ${token}` } };

    axios
      .get('social/getallusermatche', headers)
      .then((res1) => {
        res1.data.result.forEach((id) => {
          axios
            .get(`social/getallusermatchemore/${id}`, headers)
            .then((res2) => {
              const { usermatche } = res2.data;

              axios
                .get(`users/id/${res2.data.usermatche}`, headers)
                .then((res3) => {
                  const { matches } = this.state;
                  const { user } = res3.data;
                  const { username, photo, master = photo.master } = user;

                  this.setState({ matches: matches.concat({ id, usermatche, username, avatar: photo[master] }) });
                  // console.log(user.username);
                });
            });
        });
      })
      .catch((err) => { console.log(err.response.data); });
  }

  handleMatcheList = (clickedMatche) => {
    this.setState({ clickedMatche });
  }

  render() {
    const { matches, clickedMatche } = this.state;

    let content = (
      <div className="MatcheList">
        {matches.map(matche => (
          <div key={matche.id} className="Pointer Channel" onClick={() => this.handleMatcheList(matche.id)}>
            {!matche.avatar ? (
              <Avatar style={{ backgroundColor: 'grey' }}>
                {matche.username[0].charAt(0).toUpperCase()}
              </Avatar>
            )
              : <Avatar alt={matche.username} src={`data:image/png;base64,${matche.avatar}`} />}
            {matche.username}
          </div>
        ))}
      </div>
    );

    if (clickedMatche) {
      content = (
        <Messages
          idMatche={clickedMatche}
          back={() => this.setState({ clickedMatche: false })}
        />
      );
    }

    return (
      <ChatWidget>
        {content}
      </ChatWidget>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  token: state.auth.token,
});

export default connect(mapStateToProps)(Chat);

/*
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
    const { user } = this.props;
    const { idUser } = user;
    const userId = idUser;

    this.socket = io('localhost:8080');

    this.socket.emit('USER-LOGIN', userId);

    const addMessage = (data) => {
      const { messages } = this.state;
      this.setState({ messages: [...messages, data] });
    };

    this.socket.on('USER-IS-LOGIN', (idUserLogged, status) => {
      if (status === true) {
        console.log(`${idUserLogged} is log`);
        // la tu peux set un rond verd par ex pour dire au'il est log
      } else {
        console.log(`${idUserLogged} is not log`);
        // et la un rond rouge par exemple
      }
    });

    this.socket.on('RECEIVE_MESSAGE', (data) => {
      addMessage(data);
    });
  }

  componentDidMount = () => {

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

*/
