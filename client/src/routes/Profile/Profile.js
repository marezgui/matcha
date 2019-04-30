import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Layout from '../../hoc/Layout/Layout';

class Profile extends Component {
    render () {
        return (
            <Layout>
                <div>Connexion reussi (<NavLink to='/logout'> Se deconnecter </NavLink>)</div>
            </Layout>
        )
    }
}

export default Profile;