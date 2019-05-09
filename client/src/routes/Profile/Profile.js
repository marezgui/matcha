import { Col, Row, Container, } from 'reactstrap';
import { Button, Form, Icon } from 'semantic-ui-react';
import React, { Component } from 'react';
import Layout from '../../components/Layout/Layout';
import './Profile.css';

class Profile extends Component {
  editProfil = (e) => {
    e.preventDefault();
    console.log('edit profile');
  };

  editPerso = (e) => {
    e.preventDefault();
    console.log('edit information personnel');
  };

  render() {
    const PersonelInfo = (
      <Form className="bloc">
        <h4 className="ui dividing header">Personal Information</h4>
        <Form.Input
          fluid
          id="fistName"
          label="First name"
          placeholder="First name"
          iconPosition="left"
        >
          <Icon name="user" />
          <input />
        </Form.Input>
        <Form.Input
          fluid
          id="lastName"
          label="Last name"
          placeholder="Last name"
          iconPosition="left"
        >
          <Icon name="user" />
          <input />
        </Form.Input>
        <Form.Input
          fluid
          id="dateOfBirth"
          label="Date of Birth"
          type="date"
          iconPosition="left"
        >
          <Icon name="calendar alternate" />
          <input />
        </Form.Input>
        <h4 className="ui dividing header">Account Information</h4>
        <Form.Input
          fluid
          id="mail"
          label="Email"
          placeholder="Email"
          type="mail"
          iconPosition="left"
        >
          <Icon name="at" />
          <input />
        </Form.Input>
        <Form.Input
          fluid
          id="username"
          label="Username"
          placeholder="Username"
          iconPosition="left"
        >
          <Icon name="user" />
          <input />
        </Form.Input>
        <Form.Input
          fluid
          id="password"
          label="Password"
          placeholder="Password"
          type="password"
          iconPosition="left"
        >
          <Icon name="key" />
          <input />
        </Form.Input>
        <Form.Input
          fluid
          id="confirmPassword"
          label="Confirm Password"
          placeholder="Confirm Password"
          type="password"
          iconPosition="left"
        >
          <Icon name="key" />
          <input />
        </Form.Input>
        <Button type="submit">Update</Button>
      </Form>
    );

    const ProfilInfo = (
      <Form className="bloc">
        <h4 className="ui dividing header">Profile Information</h4>
        <Form.Group widths="equal">
          <Form.TextArea
            className="textplain"
            id="bio"
            label="Describe your self"
            placeholder="Write a cool description of your self"
            maxLength="500"
            rows="5"
          />
        </Form.Group>
        <Form.Group>
          <Form.Radio />
        </Form.Group>
      </Form>
    );
    return (
      <Layout>
        <Container>
          <Row>
            <Col>{PersonelInfo}</Col>
            <Col>{ProfilInfo}</Col>
          </Row>
        </Container>
      </Layout>
    );
  }
}

export default Profile;
