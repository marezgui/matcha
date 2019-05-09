import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Image, Icon } from 'semantic-ui-react';
import Slider from 'react-slick';
import Chip from '@material-ui/core/Chip';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Layout from 'components/Layout/Layout'
import './People.css';

class People extends Component {
  state = {};

  render() {
    const { user } = this.props;
    const { firstName, lastName, username, bio } = user;
    const settings = {
      dots: true,
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
      <section className="People">
        <Card color="blue">
          <Slider {...settings} className="Slider">
            <Image src="https://react.semantic-ui.com/images/avatar/large/matthew.png" />
            <Image src="https://react.semantic-ui.com/images/avatar/large/matthew.png" />
          </Slider>
          <Card.Content>
            <Card.Header>
              {`${firstName} ${lastName}`}
            </Card.Header>
            <Card.Content extra>
              <p>
              Score
              </p>
            </Card.Content>
            <Card.Meta>
              Biography
            </Card.Meta>
            <Card.Description>
              {bio || 'Elliot is a sound engineer living in Nashville who enjoys playing guitar and hanging with his cat.'}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <div>
              <Chip style={{ height: '14px' }} label="# tag" />
              <Chip style={{ margin: '3px', height: '14px' }} label="# tag" />
              <Chip style={{ height: '14px' }} label="# tag" />
              <Chip style={{ margin: '1px', height: '14px' }} label="# tag" />
              <Chip style={{ height: '14px' }} label="# tag" />
            </div>
          </Card.Content>
        </Card>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(People);
