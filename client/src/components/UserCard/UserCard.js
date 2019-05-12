import React, { Component } from 'react';
import { Card, Image } from 'semantic-ui-react';
import Slider from 'react-slick';
import Chip from '@material-ui/core/Chip';
import { getAge } from 'shared/utility';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './UserCard.css';

class UserCard extends Component {
  state = {};

  render() {
    const { user } = this.props;
    const { firstName,
      bio,
      dateOfBirth,
      photo,
      score,
      genre,
      orientation } = user;
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

    return (
      <section className="UserCard">
        <Card>
          <Slider {...settings} className="Slider">
            <Image src={`data:image/png;base64,${photo[master]}`} />
            {Object.keys(photo).map(
              value => (photo[value] && photo[value].length !== 6 ? <Image src={`data:image/png;base64,${photo[value]}`} /> : null)
            )}
          </Slider>
          <Card.Content>
            <Card.Header className="CardHeader">
              <span>
                <button type="button" className="Like">
                  <i className="far fa-heart" />
                </button>
              </span>
              <span>{`${firstName.charAt(0).toUpperCase() + firstName.slice(1)}, ${getAge(dateOfBirth)} years`}</span>
              <span className="Status">
                <i className="fas fa-circle" />
                 offline
              </span>
            </Card.Header>
            <Card.Content extra>
              <p className="Information">
                <span className="Distance">
                  <i className="fas fa-map-marker-alt" />
                   0,6Km
                </span>
                <span>
                  {{
                    M: (<i className="fas fa-mars" />),
                    W: (<i className="fas fa-venus" />),
                    O: (<i className="fas fa-transgender-alt" />),
                  }[genre]}
                  {' '}
                  <i className="fas fa-exchange-alt" />
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
              {bio}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <div>
              <Chip style={{ height: '14px' }} label="# tag" />
              <Chip style={{ margin: '3px', height: '14px' }} label="# tag" />
              <Chip style={{ height: '14px' }} label="# tag" />
              <Chip style={{ margin: '1px', height: '14px' }} label="# tag" />
              <Chip style={{ height: '14px' }} label="# tag" />
              <Chip style={{ height: '14px' }} label="# tag" />
              <Chip style={{ height: '14px' }} label="# tag" />
            </div>
          </Card.Content>
        </Card>
      </section>
    );
  }
}

export default UserCard;
