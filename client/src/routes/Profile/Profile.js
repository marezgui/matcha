import React, { Component } from 'react';

import Layout from '../../hoc/Layout/Layout';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import { Col, Row, Container } from 'reactstrap';

import './Profile.css';

class Profile extends Component {

    state = {
        firstName: '',

    }

    editProfil = (e) => {
        e.preventDefault();
        console.log("edit profile");
    };

    editPerso = (e) => {
        e.preventDefault();
        console.log("edit information personnel");
    };

    render() {
        const PersonelInfo = (
            <div className="bloc">
                <h3 className="box-title">Informations Personnel</h3>
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
                        <Button >Modifier</Button>
                    </Container>
                </form>
            </div>
        )

        const ProfilInfo = (
            <div className="bloc">
                <h3 className="box-title">Profile</h3>
                <form className="box-content" onSubmit={this.editProfil}>
                    {/* 
                        bigraphie
                        genre
                        notification
                        orientation
                        localisation
                 */}
                    <Input inputtype="textarea" label="Biographie" type="text" name="bio" placeholder="Decrivez-vous en quelques mots" />
                    <fieldset className="btn-radio">
                        <legend>Genre</legend>
                        <Input inputtype="input" type="radio" label="Homme" name="genre" value="Homme" />
                        <Input inputtype="input" type="radio" label="Femme" name="genre" value="Femme" />
                    </fieldset>
                    <Input label="Notification par mail" type="checkbox" name="notifications" />
                    <fieldset className="btn-radio">
                        <legend>Orientation:</legend>
                        <Input inputtype="input" type="radio" label="Hommes" name="orientation" value="Homme" />
                        <Input inputtype="input" type="radio" label="Femmes" name="orientation" value="Femme" />
                        <Input inputtype="input" type="radio" label="Bisexuel" name="orientation" value="Bisexuel" />
                    </fieldset>

                </form>
            </div>
        )
        return (
            <Layout>
                <Container>
                    <Row>
                        <Col>{PersonelInfo}</Col>
                        <Col>{ProfilInfo}</Col>
                    </Row>
                </Container>
            </Layout>
        )
    }
}

export default Profile;