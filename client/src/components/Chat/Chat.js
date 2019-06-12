import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import io from 'socket.io-client';
import { Avatar } from '@material-ui/core';
import * as actions from '../../store/actions/index';
import ChatWidget from '../UI/ChatWidget/ChatWidget';
import Messages from './Messages/Messages';
import Spinner from '../UI/Spinner/Spinner';
import './Chat.css';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      matches: [],
      matchedId: [],
      clickedMatche: false,
      matcheWith: null,
      loading: true,
    };
    this.socket = io('localhost:8080', { transports: ['websocket'], upgrade: false });
    // eslint-disable-next-line no-unused-vars
    this.socket.on('NEW-MATCHE', (idMatche, idUser, id) => {
      this.socket.emit('CREATE-NOTIFICATION', idUser);
      if (this._isMounted) {
        this.setState({ matches: [] }, () => {
          if (this._isMounted) { this.setState({ clickedMatche: false }); }
          this.componentDidMount();
        });
      }
    });
    this.socket.on('REMOVE-MATCHE', () => {
      if (this._isMounted) {
        this.setState({ matches: [] }, () => {
          if (this._isMounted) { this.setState({ clickedMatche: false }); }
          this.componentDidMount();
        });
      }
    // console.log('new-unmatche', idMatche);
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
              // console.log(res2);
              const { matchedId } = this.state;
              const { usermatche } = res2.data;
              if (this._isMounted) {
                this.setState({ matchedId: matchedId.concat(usermatche) });
              }
              axios
                .get(`http://localhost:8080/api/users/id/${res2.data.usermatche}`, headers)
                .then((res3) => {
                  const { matches } = this.state;
                  const { user } = res3.data;
                  const { username, photo, master = photo.master } = user;
                  const matche = { id, usermatche, username, avatar: photo[master] };
                  if (this._isMounted) {
                    this.setState({ matches: matches.concat(matche) });
                  }

                  // console.log(user.username);
                });
            });
        });
        if (this._isMounted) {
          this.setState({ loading: false });
        }
      })
      .catch((err) => { console.log(err.response.data); });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleMatcheList = (clickedMatche, matcheWith) => {
    this.setState({ clickedMatche, matcheWith });
  }

  resetBadge = () => {
    const { token, onNotif } = this.props;

    axios
      .get('http://localhost:8080/api/notifchat/getnotifvue/NEWMESSAGE', { headers: { Authorization: `bearer ${token}` } })
      .then(() => {
        // console.log(res);
        setTimeout(() => { onNotif(token); }, 500);
      });
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
                  {username.charAt(0).toUpperCase() || ''}
                </Avatar>
              )
                : <Avatar alt={username} src={`data:image/jpg;base64,${avatar}`} />}
              <p className="ChannelName">
                {username.charAt(0).toUpperCase() + username.slice(1) || ''}
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
      <ChatWidget clicked={this.resetBadge}>
        {content}
      </ChatWidget>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  token: state.auth.token,
});

const mapDispatchToProps = dispatch => ({
  onNotif: token => dispatch(actions.getNotif(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
