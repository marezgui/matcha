import {
  Col, Row, Container, FormGroup, Label, CustomInput, InputGroup, InputGroupAddon, Input as InputStrap,
} from 'reactstrap';
import React, { Component } from 'react';
import Layout from '../../components/Layout/Layout';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';


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
      <div className="bloc">
        <div className="box-title">
          <h3>
            <i className="fas fa-address-book" />
            Informations Personnel
          </h3>
        </div>
        <div className="box-content">
          <form className="box-content" onSubmit={this.editPerso}>
            <Container>
              <Row>
                <Col><Input inputtype="input" label="First Name" type="text" name="firstName" placeholder="First Name" /></Col>
                <Col><Input inputtype="input" label="Last Name" type="text" name="lastname" placeholder="Last Name" /></Col>
                <Col><Input inputtype="input" label="Date of birth" type="date" name="dateOfBirth" placeholder="Date of birth" /></Col>
              </Row>
              <Row>
                <Col><Input inputtype="input" label="Email" type="mail" name="email" placeholder="Email" /></Col>
                <Col><Input inputtype="input" label="Login" type="text" name="login" placeholder="Login" /></Col>
              </Row>
              <Row>
                <Col><Input inputtype="input" label="Password" type="password" name="password" placeholder="Password" /></Col>
                <Col><Input inputtype="input" label="Confirme Password" type="password" name="password1" placeholder="Password" /></Col>
              </Row>
              <Button>Modifier</Button>
            </Container>
          </form>
        </div>
      </div>
    );

    const ProfilInfo = (
      <div className="bloc">
        <div className="box-title">
          <h3>Profile</h3>
        </div>
        <form className="box-content" onSubmit={this.editProfil}>
          <Container>
            <Row>
              <Col><Input inputtype="textarea" rows="20" label="Biographie" type="text" name="bio" placeholder="Decrivez-vous en quelques mots" /></Col>
            </Row>
            <Row>
              <Col>
                <FormGroup>
                  <Label for="Radio-genre" className="label-form">Genre</Label>
                  <Row>
                    <Col><CustomInput type="radio" id="genre-homme" name="genre" label="Homme" /></Col>
                    <Col><CustomInput type="radio" id="genre-femme" name="genre" label="Femme" /></Col>
                  </Row>
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label for="Radio-genre" className="label-form">Orientation</Label>
                  <Row>
                    <Col><CustomInput type="radio" id="orientation-homme" name="orientation" label="Homme" /></Col>
                    <Col><CustomInput type="radio" id="orientation-femme" name="orientation" label="Femme" /></Col>
                    <Col><CustomInput type="radio" id="orientation-bisexuel" name="orientation" label="Bisexuel" /></Col>
                  </Row>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <FormGroup>
                <Col><CustomInput type="switch" id="notification" name="notification" label="Recevoir les notifications par mail" /></Col>
              </FormGroup>
            </Row>
            <Row>
              <InputGroup>
                <InputGroupAddon addonType="prepend">!</InputGroupAddon>
                <InputStrap placeholder="localisation" />
              </InputGroup>
            </Row>
          </Container>
        </form>
      </div>
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
