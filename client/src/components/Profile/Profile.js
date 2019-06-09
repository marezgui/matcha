import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Image } from 'semantic-ui-react';
import Chip from '@material-ui/core/Chip';
import io from 'socket.io-client';
import Slider from 'react-slick';
import { getAge, getLastLog } from '../../shared/utility';
import Modal from '../UI/Modal/Modal';
import Backdrop from '../UI/Backdrop/Backdrop';
import './Profile.scss';

class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reported: false,
      blocked: false,
      showBackdrop: true,
    };
    this.socket = io('localhost:8080', { transports: ['websocket'], upgrade: false });
  }

  componentDidMount() {
    this._isMounted = true;

    this.getReportStatus();
    const { data: { idUser }, token } = this.props;
    axios
      .get(`http://localhost:8080/api/notifchat/notifvue/${idUser}`, { headers: { Authorization: `bearer ${token}` } })
      .then(() => {
        this.socket.emit('CREATE-NOTIFICATION', idUser);
      })
      .catch(() => { });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  onClickHandler = () => {
    const { handleProfile } = this.props;

    this.setState({ showBackdrop: false });
    handleProfile();
  }

  getReportStatus = () => {
    const { data: { idUser }, token } = this.props;

    axios
      .get(`http://localhost:8080/api/social/getuserreported/${idUser}`, { headers: { Authorization: `bearer ${token}` } })
      .then((res) => {
        if (res.data.message === 'true') {
          if (this._isMounted) {
            this.setState({ reported: true });
          }
        }
      });
    axios
      .get(`http://localhost:8080/api/social/getuserblocked/${idUser}`, { headers: { Authorization: `bearer ${token}` } })
      .then((res) => {
        if (res.data.message === 'true') {
          if (this._isMounted) {
            this.setState({ blocked: true });
          }
        }
      });
  }

  changeReportStatus = async () => {
    const { data: { idUser }, token } = this.props;
    const { reported } = this.state;

    const headers = { headers: { Authorization: `bearer ${token}` } };
    await this.getReportStatus();

    if (reported) {
      // this.setState({ reported: false });
      axios
        .delete(`http://localhost:8080/api/social/report/${idUser}`, headers)
        .then(() => {
          if (this._isMounted) {
            this.setState({ reported: false });
          }
        })
        .catch(err => err);// console.log(err.response.data.error));
    } else {
      // this.setState({ reported: true });
      axios
        .post(`http://localhost:8080/api/social/report/${idUser}`, null, headers)
        .then(() => {
          if (this._isMounted) { this.setState({ reported: true }); }
        })
        .catch(err => err);// console.log(err.response.data.error));
    }
  }

  changeBlockStatus = async () => {
    const { data: { idUser }, token } = this.props;
    const { blocked } = this.state;

    const headers = { headers: { Authorization: `bearer ${token}` } };
    await this.getReportStatus();

    if (blocked) {
      // this.setState({ blocked: false });
      axios
        .delete(`http://localhost:8080/api/social/block/${idUser}`, headers)
        .then(() => {
          if (this._isMounted) { this.setState({ blocked: false }); }
        })
        .catch(err => err);// console.log(err.response.data.error));
    } else {
      // this.setState({ blocked: true });
      axios
        .post(`http://localhost:8080/api/social/block/${idUser}`, null, headers)
        .then(() => {
          if (this._isMounted) { this.setState({ blocked: true }); }
        })
        .catch(err => err);// console.log(err.response.data.error));
    }
  }

  render() {
    const { data, online, onlineClasses, settings, meta, handleLike } = this.props;
    const { blocked, reported, showBackdrop } = this.state;
    const { idUser,
      username,
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

    let reportStatus = 'Report';
    let blockStatus = 'Block';

    if (reported) reportStatus = 'Un-Report';
    if (blocked) blockStatus = 'Un-Block';

    return (
      <>
        <Backdrop show={showBackdrop} clicked={this.onClickHandler} />
        <Modal clicked={this.onClickHandler} title={`${username.charAt(0).toUpperCase() + username.slice(1)}` || ''}>
          <section className="Profile">
            <div className="ProfilePictures">
              <Slider {...settings} className="Slider">
                <Image className="Grabber ProfilePictures" src={`data:image/png;base64,${photo[master]}`} />
                {Object.keys(photo).map(
                  (value, id) => (photo[value] && photo[value].length !== 6 ? <Image key={`${photo[id]}-${idUser}`} className="Grabber ProfilePictures" src={`data:image/png;base64,${photo[value]}`} /> : null)
                )}
              </Slider>
            </div>
            <div className="ProfileHeader">
              <div className={onlineClasses.join(' ')}>
                <span>
                  <i className="fas fa-circle" />
                  {online ? 'Online' : getLastLog(connexionLog)}
                </span>
              </div>
              <span>
                <button type="button" className="Like" onClick={handleLike}>
                  {meta.likeStatus}
                </button>
              </span>
              <span onClick={this.profileHandler} role="presentation" className="Pointer">
                <p style={{ display: 'inline-block' }}>
                  {`${firstName.charAt(0).toUpperCase() + firstName.slice(1)}` || ''}
                </p>
                <p style={{ display: 'inline-block' }}>{`, ${getAge(dateOfBirth)} years`}</p>
              </span>
            </div>
            <div className="ProfileMeta">
              <p>
                Location:
                {' '}
                <span>
                  <i className="fas fa-map-marker-alt" />
                  {` ${location.city}`}
                </span>
              </p>
              <p>
                Genre:
                {' '}
                {{
                  M: (<i className="fas fa-mars" />),
                  W: (<i className="fas fa-venus" />),
                  O: (<i className="fas fa-transgender-alt" />),
                }[genre]}
              </p>
              <p>
                Orientation:
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
              </p>
              <p>
                Score:
                {' '}
                <span className="Popularity">
                  <i className="fas fa-fire-alt" />
                  {score}
                </span>
              </p>
            </div>
            <div className="ProfileBio">
              <p style={{ color: 'rgba(0,0,0,.6)' }}>
                <i className="fas fa-book-open" />
                {' '}
                Biography
              </p>
              <p>
                {bio}
              </p>
            </div>
            <div className="ProfileTags">
              <p style={{ color: 'rgba(0,0,0,.6)' }}>
                <i className="fas fa-tag" />
                {' '}
              Tags
              </p>
              <div className="TagsList">
                {meta.tags.map((tag, id) => (<Chip key={id} style={{ height: '14px', marginRight: '2px' }} label={tag} />))}
              </div>
            </div>
            <div className="Report">
              <p style={{ marginLeft: 'auto', padding: '5px' }}>
                <span className="Pointer" onClick={this.changeBlockStatus} role="presentation">
                  <i className="fas fa-ban" />
                  <span>
                    {blockStatus}
                  </span>
                </span>
                {'   '}
                <span className="Pointer" onClick={this.changeReportStatus} role="presentation">
                  <i className="fas fa-exclamation-triangle" />
                  <span>
                    {reportStatus}
                  </span>
                </span>
              </p>
            </div>
          </section>
        </Modal>
      </>
    );
  }
}

const mapStateToProps = state => ({
  token: state.auth.token,
});

export default connect(mapStateToProps)(ProfilePage);
