import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import io from 'socket.io-client';
import { Avatar } from '@material-ui/core';
import ChatWidget from '../UI/ChatWidget/ChatWidget';
import Messages from './Messages/Messages';
import Spinner from '../UI/Spinner/Spinner';
import './Chat.css';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      matches: [],
      clickedMatche: false,
      matcheWith: null,
      loading: true,
    };
    this.socket = io('localhost:8080', { transports: ['websocket'], upgrade: false });
    this.socket.on('NEW-MATCHE', (idMatche) => {
      console.log('new-matche', idMatche);
    });
    this.socket.on('REMOVE-MATCHE', (idMatche) => {
      console.log('new-unmatche', idMatche);
    });
  }

  componentDidMount = () => {
    this._isMounted = true;
    const { token } = this.props;
    const headers = { headers: { Authorization: `bearer ${token}` } };

    axios
      .get('http://localhost:8080/api/social/getallusermatche', headers)
      .then((res1) => {
        res1.data.result.forEach((id) => {
          axios
            .get(`http://localhost:8080/api/social/getallusermatchemore/${id}`, headers)
            .then((res2) => {
              const { usermatche } = res2.data;

              axios
                .get(`http://localhost:8080/api/users/id/${res2.data.usermatche}`, headers)
                .then((res3) => {
                  const { matches } = this.state;
                  const { user } = res3.data;
                  const { username, photo, master = photo.master } = user;
                  const matche = { id, usermatche, username, avatar: photo[master] };

                  if (this._isMounted) {
                    this.setState({ matches: matches.concat(matche), loading: false });
                  }
                  // console.log(user.username);
                });
            });
        });
      })
      .catch((err) => { console.log(err.response.data); });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleMatcheList = (clickedMatche, matcheWith) => {
    this.setState({ clickedMatche, matcheWith });
  }

  render() {
    const { loading, matches, clickedMatche, matcheWith } = this.state;

    let content = <Spinner />;
    if (!loading) {
      content = (
        <div className="MatcheList">
          {matches.map(({ id, usermatche, username, avatar }) => (
            <div key={id} className="Pointer Channel" role="presentation" onClick={() => this.handleMatcheList(id, usermatche)}>
              {!avatar ? (
                <Avatar style={{ backgroundColor: 'grey' }}>
                  {username.charAt(0).toUpperCase()}
                </Avatar>
              )
                : <Avatar alt={username} src={`data:image/png;base64,${avatar}`} />}
              <p className="ChannelName">
                {username.charAt(0).toUpperCase() + username.slice(1)}
              </p>
            </div>
          ))}
        </div>
      );
    }

    if (clickedMatche) {
      content = (
        <Messages
          idMatche={clickedMatche}
          usermatche={matcheWith}
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
