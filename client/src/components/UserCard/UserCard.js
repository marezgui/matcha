import React, { Component } from 'react';
import { Card, Image } from 'semantic-ui-react';
import Slider from 'react-slick';
import axios from 'axios';
import { connect } from 'react-redux';
import Profile from 'components/Profile/Profile';
// import Chip from '@material-ui/core/Chip';
import { getAge, getLastLog } from 'shared/utility';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './UserCard.css';

class UserCard extends Component {
  state = {
    liked: false,
    tags: [],
    showLink: false,
    modal: false,
  };

  componentDidMount() {
    this.getLikeStatus();
    this.getTags();
  }

  getLikeStatus = () => {
    const { data, token } = this.props;
    const { idUser } = data;

    axios
      .get(`social/getuserliked/${idUser}`, { headers: { Authorization: `bearer ${token}` } })
      .then((res) => {
        if (res.data.message === 'true') {
          this.setState({ liked: true });
        }
      });
  }

  getTags = () => {
    const { token, data } = this.props;
    const { idUser } = data;

    axios
      .get(`users/usertag/${idUser}`, { headers: { Authorization: `bearer ${token}` } })
      .then((res) => {
        this.setState({ tags: res.data.usertag });
      });
  }

  changeLikeStatus = async () => {
    const { data, token } = this.props;
    const { liked } = this.state;

    const { idUser } = data;
    const headers = { headers: { Authorization: `bearer ${token}` } };
    await this.getLikeStatus();

    if (liked) {
      this.setState({ liked: false });
      axios
        .delete(`social/like/${idUser}`, headers)
        .then(res => this.setState({ liked: false }));
    } else {
      this.setState({ liked: true });
      axios
        .post(`social/like/${idUser}`, null, headers)
        .then(res => this.setState({ liked: true }));
    }
  }

  showMore = () => {
    this.setState(prevState => ({ showLink: !prevState.showLink }));
  }

  profileHandler = () => {
    const { modal } = this.state;

    this.setState(prevState => ({ modal: !prevState.modal }), () => {
      if (modal) document.body.classList.remove('ModalOpen'); // Prevent Body scroll
      else document.body.classList.add('ModalOpen');
    });
  }

  render() {
    const { data } = this.props;
    const { liked, showLink, tags, modal } = this.state;

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

    let likeStatus = (<i className="far fa-heart" />);
    let showLinkClasses = ['Biography', 'Hide'];

    if (liked) likeStatus = (<i className="fas fa-heart" />);

    if (showLink) showLinkClasses = ['Biography', 'Show'];

    const meta = {
      tags,
      likeStatus,
    };

    return (
      <>
        <section className="UserCard">
          <Card>
            <Slider {...settings}>
              <Image className="Grabber UserCardPictures" src={`data:image/png;base64,${photo[master]}`} />
              {Object.keys(photo).map(
                (value, id) => (photo[value] && photo[value].length !== 6 ? <Image key={`${photo[id]}-${idUser}`} className="Grabber UserCardPictures" src={`data:image/png;base64,${photo[value]}`} /> : null)
              )}
            </Slider>
            <Card.Content>
              <Card.Header>
                <div className="Status">
                  <span>
                    <i className="fas fa-circle" />
                    {' '}
                    {getLastLog(connexionLog)}
                  </span>
                </div>
                <span>
                  <button type="button" className="Like" onClick={this.changeLikeStatus}>
                    {likeStatus}
                  </button>
                </span>
                <span onClick={this.profileHandler} role="presentation" className="Pointer">
                  <p style={{ display: 'inline-block' }}>
                    {`${firstName.charAt(0).toUpperCase() + firstName.slice(1)}`}
                  </p>
                  <p style={{ display: 'inline-block' }}>{`, ${getAge(dateOfBirth)} years`}</p>
                </span>
              </Card.Header>
              <Card.Content extra>
                <p className="Information">
                  <span>
                    <i className="fas fa-map-marker-alt" />
                    {` ${location.city}`}
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
