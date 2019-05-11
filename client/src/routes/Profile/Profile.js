import { Col, Row, Container, } from 'reactstrap';
import { Button, Form, } from 'semantic-ui-react';
import React, { Component } from 'react';
import Layout from '../../components/Layout/Layout';
import './Profile.css';

class Profile extends Component {

  editPerso = (e) => {
    e.preventDefault();
    console.log('edit information personnel');
  };

  editProfil = (e) => {
    e.preventDefault();
  };

  render() {
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
        />
        <Form.Input
          fluid
          id="lastName"
          label="Last name"
          placeholder="Last name"
          iconPosition="left"
          icon="user"
        />
        <Form.Input
          fluid
          id="dateOfBirth"
          label="Date of Birth"
          type="date"
          iconPosition="left"
          icon="calendar alternate"
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
        />
        <Form.Input
          fluid
          id="username"
          label="Username"
          placeholder="Username"
          iconPosition="left"
          icon="user"
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
        />
        <Form.Group grouped>
          <h5 className="ui dividing header">Genre</h5>
          <Form.Field label="Man" control="input" type="radio" name="genre" />
          <Form.Field label="Women" control="input" type="radio" name="genre" />
          <Form.Field label="Other" control="input" type="radio" name="genre" />
        </Form.Group>
        <Form.Group grouped>
          <h5 className="ui dividing header">Orientation</h5>
          <Form.Field label="Man" control="input" type="radio" name="orientation" />
          <Form.Field label="Women" control="input" type="radio" name="orientation" />
          <Form.Field label="Bisexuel" control="input" type="radio" name="orientation" />
        </Form.Group>
        <Form.Checkbox toggle type="checkbox" label="Mail notification" name="notification" />
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

export default Profile;
