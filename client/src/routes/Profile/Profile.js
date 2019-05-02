import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Layout from '../../hoc/Layout/Layout';
import Input from '../../components/UI/Input/Input';
import '../Auth/Auth.scss';

class Profile extends Component {
    render() {
        return (
            <Layout>
                <form className="box">
                    <Input inputtype="input" label="First Name" type="text" name="firstName" placeholder="First Name" />
                    <Input inputtype="input" label="Last Name" type="text" name="lastname" placeholder="Last Name" />
                    <Input inputtype="input" label="Date of birth" type="date" name="dateOfBirth" placeholder="Date of birth" />
                    <Input inputtype="input" label="Login" type="text" name="login" placeholder="Login" />
                    <Input inputtype="input" label="Email" type="mail" name="email" placeholder="Email" />
                    <Input inputtype="input" label="Password" type="password" name="password" placeholder="Password" />
                </form>
            </Layout>
        )
    }
}

export default Profile;