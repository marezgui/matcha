import React, { Component } from 'react';
import axios from 'axios';
import { Avatar } from '@material-ui/core';
import Spinner from '../../../components/UI/Spinner/Spinner';
import './Notification.css';

class Notification extends Component {
    state = {
      user: [],
      loading: true,
    }

    componentDidMount = () => {
      this._isMounted = true;
      const { token, content: { userIdSender } } = this.props;

      axios
        .get(`http://localhost:8080/api/users/id/${userIdSender}`, { headers: { Authorization: `bearer ${token}` } })
        .then((res) => {
          if (this._isMounted) {
            this.setState({ user: res.data.user, loading: false });
          }
        });
    }

    componentWillUnmount() {
      this._isMounted = false;
    }

    render() {
      const { content: { type, message } } = this.props; // userIdSender, vue
      const { loading, user: {
        firstName,
        photo,
      } } = this.state;

      let notification = <Spinner />;

      if (!loading) {
        notification = (
          <>
            <div className="NotificationIcon">
              {{
                VUE: (<i className="fas fa-eye notifVue" />),
                LIKE: (<i className="far fa-heart notifLike" />),
                UNLIKE: (<i className="fas fa-heart-broken notifUnlike" />),
                MATCHE: (<i className="far fa-grin-hearts notifMatche" />),
                NEWMESSAGE: (<i className="far fa-comment notifNewMsg" />),
                OTHER: (<i className="fab fa-angellist notifOther" />),
              }[type]}
            </div>
            <div className="NotificationInfo">
              <p>
                {message.charAt(0).toUpperCase() + message.slice(1)}
              </p>
              {/* <p>
            vue:
                {' '}
                {vue ? 'true' : 'false'}
              </p> */}
            </div>
            <div className="NotificationAvatar">
              {photo[photo.master]
                ? <Avatar alt={firstName} src={`data:image/png;base64,${photo[photo.master]}`} />
                : (
                  <Avatar style={{ backgroundColor: 'grey' }}>
                    {' '}
                    {firstName.charAt(0).toUpperCase()}
                    {' '}
                  </Avatar>
                )}
            </div>
          </>
        );
      }
      return (
        <div className="Notification">
          {notification}
        </div>
      );
    }
}

export default Notification;
