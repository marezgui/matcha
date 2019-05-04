import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Layout from '../../hoc/Layout/Layout';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';

import './Profile.css';

class Profile extends Component {

    editProfil = (e) => {
        e.preventDefault();
        console.log("edit profile");
    };hdf


    render() {
        return (
            <Layout>
                <div className="bloc">
                    <h3 className="box-title">Informations Personnel</h3>
                    <form className="box-content" onSubmit={this.editProfil}>
                        <Input inputtype="input" label="First Name" type="text" name="firstName" placeholder="First Name" />
                        <Input inputtype="input" label="Last Name" type="text" name="lastname" placeholder="Last Name" />
                        <Input inputtype="input" label="Date of birth" type="date" name="dateOfBirth" placeholder="Date of birth" />
                        <Input inputtype="input" label="Login" type="text" name="login" placeholder="Login" />
                        <Input inputtype="input" label="Email" type="mail" name="email" placeholder="Email" />
                        <Input inputtype="input" label="Password" type="password" name="password" placeholder="Password" />
                        <Button >Modifier</Button>
                    </form>
                </div>
            </Layout>
        )
    }
}

export default Profile;