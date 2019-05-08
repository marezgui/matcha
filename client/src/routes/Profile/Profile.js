import { Col, Row, Container, } from 'reactstrap';
import { Button, Form } from 'semantic-ui-react';
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
      <Form>
        <h4 className="ui dividing header">Personnel Information</h4>
        <Form.Group>
          <Form.Input
            fluid
            id="form-subcomponent-shorthand-input-first-name"
            label="First name"
            placeholder="First name"
            width={6}
          />
          <Form.Input
            fluid
            id="form-subcomponent-shorthand-input-last-name"
            label="Last name"
            placeholder="Last name"
            width={6}
          />
          <Form.Input
            fluid
            id="form-subcomponent-shorthand-input-last-name"
            label="Date of Birth"
            type="date"
            width={4}
          />
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Input
            fluid
            id="form-subcomponent-shorthand-input-last-name"
            label="Email"
            placeholder="Email"
            type="mail"
          />
          <Form.Input
            fluid
            id="form-subcomponent-shorthand-input-last-name"
            label="Username"
            placeholder="Username"
          />
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Input
            fluid
            id="form-subcomponent-shorthand-input-last-name"
            label="Password"
            placeholder="Password"
            type="password"
          />
          <Form.Input
            fluid
            id="form-subcomponent-shorthand-input-last-name"
            label="Confirme Password"
            placeholder="Confirme Password"
            type="password"
          />
        </Form.Group>
        <Button type="submit">Update</Button>
      </Form>
    );

    const ProfilInfo = (
      <Form>
        <h4 className="ui dividing header">Profile Information</h4>
        <Form.Group widths="equal">
          <Form.TextArea
            class="textplain"
            fluid
            id="form-subcomponent-shorthand-input-last-name"
            label="Describe your self"
            placeholder="Write a cool description of your self"
            maxlength="50"
            rows="5"
          />
        </Form.Group>
        <Form.Group>

        </Form.Group>
      </Form>
    );
    return (
      <Layout>
        <Container>
          <Row>
            <Col>{PersonelInfo}</Col>
          </Row>
          <Row>
            <Col>{ProfilInfo}</Col>
          </Row>
        </Container>
      </Layout>
    );
  }
}

export default Profile;
