
import React, { Component } from 'react';
import { Card, Image } from 'semantic-ui-react';
import Slider from 'react-slick';
import axios from 'axios';
import Chip from '@material-ui/core/Chip';
import { getAge, getLastLog } from 'shared/utility';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './UserCard.css';

class UserCard extends Component {
  state = {
    liked: false,
    showLink: false,
    tags: [],
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
    const { liked } = this.state;
    const { data, token } = this.props;
    const { idUser } = data;
    const headers = { headers: { Authorization: `bearer ${token}` } };
    await this.getLikeStatus();

    if (liked) {
      axios
        .delete(`social/like/${idUser}`, headers)
        .then(res => this.setState({ liked: false }));
    } else {
      axios
        .post(`social/like/${idUser}`, null, headers)
        .then(res => this.setState({ liked: true }));
    }
  }

  showMore = () => {
    const { showLink } = this.state;

    this.setState({ showLink: !showLink });
  }

  render() {
    const { data } = this.props;
    const { idUser,
      firstName,
      bio,
      dateOfBirth,
      photo,
      score,
      genre,
      orientation,
      connexionLog,
      location } = data;
    // const images = Array.prototype.slice.call(photo);
    const { master } = photo;

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

    const { liked, showLink, tags } = this.state;

    let likeStatus = (<i className="far fa-heart" />);

    if (liked) {
      likeStatus = (<i className="fas fa-heart" />);
    }

    let showLinkClasses = ['Biography', 'Hide'];

    if (showLink) {
      showLinkClasses = ['Biography', 'Show'];
    }

    return (
      <section className="UserCard">
        <Card>
          <Slider {...settings} className="Slider">
            <Image src={`data:image/png;base64,${photo[master]}`} />
            {Object.keys(photo).map(
              (value, id) => (photo[value] && photo[value].length !== 6 ? <Image key={`${photo[id]}-${idUser}`} src={`data:image/png;base64,${photo[value]}`} /> : null)
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
              <span>{`${firstName.charAt(0).toUpperCase() + firstName.slice(1)}, ${getAge(dateOfBirth)} years`}</span>
            </Card.Header>
            <Card.Content extra>
              <p className="Information">
                <span className="Distance">
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
          <Card.Content extra>
            <div className="Tags">
              {tags.map((tag, id) => (<Chip key={id} style={{ height: '14px' }} label={tag} />))}
            </div>
          </Card.Content>
        </Card>
      </section>
    );
  }
}

export default UserCard;
