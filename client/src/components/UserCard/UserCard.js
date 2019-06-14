import React, { Component } from 'react';
import { Card, Image } from 'semantic-ui-react';
import Slider from 'react-slick';
import axios from 'axios';
import { connect } from 'react-redux';
// import Chip from '@material-ui/core/Chip';
import io from 'socket.io-client';
import { getAge, getLastLog } from '../../shared/utility';
import Profile from '../Profile/Profile';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './UserCard.css';

class UserCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      online: false,
      distance: null,
      liked: false,
      tags: [],
      showLink: false,
      modal: false,
    };
    this.socket = io('localhost:8080', { transports: ['websocket'], upgrade: false });
    this.socket.on('USER-STATUS', (id, isOnline) => {
      const { data: { idUser } } = this.props;
      if (id === idUser) {
        // console.log(id, isOnline, idUser);
        if (this._isMounted) { this.setState({ online: isOnline }); }
      }
    });
  }

  componentDidMount() {
    this._isMounted = true;
    this.getLikeStatus();
    this.getTags();
    this.getDistance();
    const { data: { isOnline } } = this.props;
    if (this._isMounted) { this.setState({ online: isOnline }); }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  getDistance = () => {
    const { data: { idUser }, token } = this.props;

    axios
      .get(`http://localhost:8080/api/users/userdistance/${idUser}`, { headers: { Authorization: `bearer ${token}` } })
      .then((res) => {
        if (this._isMounted) {
          this.setState({ distance: res.data.distance });
        }
        // console.log(res);
      });
  }

  getLikeStatus = () => {
    const { data: { idUser }, token } = this.props;

    axios
      .get(`http://localhost:8080/api/social/getuserliked/${idUser}`, { headers: { Authorization: `bearer ${token}` } })
      .then((res) => {
        if (res.data.message === 'true') {
          if (this._isMounted) {
            this.setState({ liked: true });
          }
        }
      })
      .catch(err => err);// console.log(err.response.data.error));
  }

  getTags = () => {
    const { data: { idUser }, token } = this.props;

    axios
      .get(`http://localhost:8080/api/users/usertag/${idUser}`, { headers: { Authorization: `bearer ${token}` } })
      .then((res) => {
        if (this._isMounted) {
          this.setState({ tags: res.data.usertag });
        }
        // console.log(res.data.usertag);
      })
      .catch(err => err);// console.log(err.response.data.error));
  }

  changeLikeStatus = async () => {
    const { data: { idUser }, token } = this.props;
    const { liked } = this.state;

    const headers = { headers: { Authorization: `bearer ${token}` } };
    await this.getLikeStatus();

    if (liked) {
      this.setState({ liked: false });
      axios
        .delete(`http://localhost:8080/api/social/like/${idUser}`, headers)
        .then(() => {
          if (this._isMounted) {
            this.setState({ liked: false });
          }
          this.socket.emit('CREATE-NOTIFICATION', idUser);
        })
        .catch(err => err);// console.log(err.response.data.error));
    } else {
      this.setState({ liked: true });
      axios
        .post(`http://localhost:8080/api/social/like/${idUser}`, null, headers)
        .then(() => {
          if (this._isMounted) {
            this.setState({ liked: true });
          }
          this.socket.emit('CREATE-NOTIFICATION', idUser);
        })
        .catch(err => err);// console.log(err.response.data.error));
    }
  }

  showMore = () => {
    this.setState(prevState => ({ showLink: !prevState.showLink }));
  }

  profileHandler = () => {
    const { clicked } = this.props;
    const { modal } = this.state;

    this.setState(prevState => ({ modal: !prevState.modal }), () => {
      if (modal) {
        document.body.classList.remove('ModalOpen'); // Prevent Body scroll
      } else {
        document.body.classList.add('ModalOpen');
        clicked();
      }
    });
  }

  render() {
    const { data } = this.props;
    const { online, liked, showLink, tags, modal } = this.state;
    let { distance } = this.state;
    const { idUser,
      firstName,
      bio,
      dateOfBirth,
      photo,
      master = photo.master,
      score,
      genre,
      orientation,
      connexionLog,
      location } = data;

    const settings = {
      dots: true,
      arrows: false,
      responsive: [
        {
          breakpoint: 766,
          settings: {
            arrows: false,
          },
        },
      ],
    };

    if (distance) distance = distance.toFixed(1);

    let likeStatus = (<i className="far fa-heart" />);
    let showLinkClasses = ['Biography', 'Hide'];
    const onlineClasses = ['Status'];

    if (liked) likeStatus = (<i className="fas fa-heart" />);
    if (showLink) showLinkClasses = ['Biography', 'Show'];
    if (online) {
      onlineClasses.push('Online');
    }

    const meta = {
      tags,
      likeStatus,
    };

    return (
      <>
        <section className="UserCard">
          <Card>
            <Slider {...settings}>
              <Image className="Grabber UserCardPictures" src={`data:image/jpg;base64,${photo[master]}`} />
              {Object.keys(photo).map(
                (value, id) => (photo[value] && photo[value].length !== 6 && photo.master !== value ? <Image key={`${photo[id]}-${idUser}`} className="Grabber UserCardPictures" src={`data:image/jpg;base64,${photo[value]}`} /> : null)
              )}
            </Slider>
            <Card.Content>
              <Card.Header>
                <div className={onlineClasses.join(' ')}>
                  <span>
                    <i className="fas fa-circle" />
                    {' '}
                    {online ? 'Online' : getLastLog(connexionLog)}
                  </span>
                </div>
                <span>
                  <button type="button" className="Like" onClick={this.changeLikeStatus}>
                    {likeStatus}
                  </button>
                </span>
                <span onClick={this.profileHandler} role="presentation" className="Pointer">
                  <p style={{ display: 'inline-block' }}>
                    {`${firstName.charAt(0).toUpperCase() + firstName.slice(1)}` || ''}
                  </p>
                  <p style={{ display: 'inline-block' }}>{`, ${getAge(dateOfBirth)} years`}</p>
                </span>
              </Card.Header>
              <Card.Content extra>
                <p className="Information">
                  <span>
                    <i className="fas fa-map-marker-alt" />
                    {` ${location.city}`}
                    <br />
                    {distance && `${distance}Km`}
                  </span>
                  <span>
                    {{
                      M: (<i className="fas fa-mars" />),
                      W: (<i className="fas fa-venus" />),
                      O: (<i className="fas fa-transgender-alt" />),
                    }[genre]}
                    {' '}
                    {(<i className="fas fa-exchange-alt" />)}
                    {' '}
                    {{
                      M: (<i className="fas fa-mars" />),
                      W: (<i className="fas fa-venus" />),
                      BI: (
                        <>
                          <i className="fas fa-mars" />
                          {' '}
                          <i className="fas fa-venus" />
                        </>
                      ),
                    }[orientation]}
                  </span>
                  <span className="Popularity">
                    <i className="fas fa-fire-alt" />
                    {score}
                  </span>
                </p>
              </Card.Content>
              <Card.Meta>
              Biography
              </Card.Meta>
              <Card.Description>
                <p className={showLinkClasses.join(' ')}>
                  {bio}
                </p>
                <p style={{ textAlign: 'right' }}>
                  <button type="button" className="ShowMore" onClick={this.showMore}>
                  Show
                    {' '}
                    {showLink ? 'Less' : 'More'}
                  </button>
                </p>
              </Card.Description>
            </Card.Content>
            {/* <Card.Content extra>
              <div className="Tags">
                {tags.map((tag, id) => (<Chip key={id} style={{ height: '14px' }} label={tag} />))}
              </div>
            </Card.Content> */}
          </Card>
        </section>
        {modal
          && (
          <Profile
            data={data}
            meta={meta}
            online={online}
            onlineClasses={onlineClasses}
            settings={settings}
            handleProfile={this.profileHandler}
            handleLike={this.changeLikeStatus}
          />
          )
        }
      </>
    );
  }
}

const mapStateToProps = state => ({
  token: state.auth.token,
});

export default connect(mapStateToProps)(UserCard);
