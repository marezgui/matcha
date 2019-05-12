import { Col, Row, Container, } from 'reactstrap';
import { Button, Form, } from 'semantic-ui-react';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateObject } from 'shared/utility';
import Layout from '../../components/Layout/Layout';
import './Profile.css';

class Profile extends Component {
  state = {
    user: [],
  }

  componentDidMount() {
    const { user } = this.props;
    this.setState({ user });
  }

  editPerso = (e) => {
    e.preventDefault();
    console.log('edit information personnel');
  };

  editProfil = (e) => {
    e.preventDefault();
  };

  handelChange = (e) => {
    const { name, value } = e.target;
    const { user } = this.state;
    
    const newValues = { ...user };
    newValues[name] = value;
    this.setState({ user: newValues });
    console.log(`name: ${name} value: ${value}`);
    console.log(this.state.user);
  }

  render() {
    const { user } = this.state;
    const { firstName, lastName, username, mail, bio, dateOfBirth, genre,
      orientation, notification } = user;
    const PersonelInfo = (
      <Form className="bloc" onSubmit={this.editPerso}>
        <h4 className="ui dividing header">Personal Information</h4>
        <Form.Input
          fluid
          id="fistName"
          label="First name"
          placeholder="First name"
          iconPosition="left"
          icon="user"
          name="firstName"
          value={firstName}
          onChange={e => this.handelChange(e)}
        />
        <Form.Input
          fluid
          id="lastName"
          label="Last name"
          placeholder="Last name"
          iconPosition="left"
          icon="user"
          value={lastName}
        />
        <Form.Input
          fluid
          id="dateOfBirth"
          label="Date of Birth"
          type="date"
          iconPosition="left"
          icon="calendar alternate"
          value={dateOfBirth}
        />
        <h4 className="ui dividing header">Account Information</h4>
        <Form.Input
          fluid
          id="mail"
          label="Email"
          placeholder="Email"
          type="email"
          iconPosition="left"
          icon="at"
          value={mail}
        />
        <Form.Input
          fluid
          id="username"
          label="Username"
          placeholder="Username"
          iconPosition="left"
          icon="user"
          value={username}
        />
        <Form.Input
          fluid
          id="password"
          label="Password"
          placeholder="Password"
          type="password"
          iconPosition="left"
          icon="key"
        />
        <Form.Input
          fluid
          id="confirmPassword"
          label="Confirm Password"
          placeholder="Confirm Password"
          type="password"
          iconPosition="left"
          icon="key"
        />
        <Button type="submit">Update</Button>
      </Form>
    );

    const ProfilInfo = (
      <Form className="bloc" onSubmit={this.editProfil}>
        <h4 className="ui dividing header">Profile Information</h4>
        <Form.TextArea
          className="textplain"
          id="bio"
          label="Describe your self"
          placeholder="Write a cool description of your self"
          maxLength="500"
          rows="5"
          style={{ resize: 'none' }}
          value={bio}
        />
        <Form.Group grouped>
          <h5 className="ui dividing header">Genre</h5>
          <Form.Field label="Man" control="input" type="radio" name="genre" value="M" checked={genre === 'M'} />
          <Form.Field label="Women" control="input" type="radio" name="genre" value="W" checked={genre === 'W'} />
          <Form.Field label="Other" control="input" type="radio" name="genre" value="O" checked={genre === 'O'} />
        </Form.Group>
        <Form.Group grouped>
          <h5 className="ui dividing header">Orientation</h5>
          <Form.Field label="Man" control="input" type="radio" name="orientation" value="M" checked={orientation === 'M'} />
          <Form.Field label="Women" control="input" type="radio" name="orientation" value="W" checked={orientation === 'W'} />
          <Form.Field label="Bisexuel" control="input" type="radio" name="orientation" value="BI" checked={orientation === 'BI'} />
        </Form.Group>
        <Form.Checkbox toggle type="checkbox" label="Mail notification" name="notification" value="1" checked={notification === 'true'} />
        <Button type="submit">Update</Button>
      </Form>
    );

    const PhotoProfile = (
      <div className="bloc">
        <img
          alt="photoDeProfile"
          src="#"
          className="photo profile"
        />
        <img
          alt="galerie"
          src="#"
          className="photo"
        />
      </div>
    );

    return (
      <Layout>
        <Container>
          <Row>
            <Col>{PhotoProfile}</Col>
          </Row>
          <Row>
            <Col md="6" sm="12">{PersonelInfo}</Col>
            <Col md="6" sm="12">{ProfilInfo}</Col>
          </Row>
        </Container>
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(Profile);
