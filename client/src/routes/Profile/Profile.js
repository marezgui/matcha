import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Layout from '../../hoc/Layout/Layout';

class Profile extends Component {
    render () {
        return (
            <Layout>
                <div>
                    <p> Profile </p>
                </div>
            </Layout>
        )
    }
}

export default Profile;