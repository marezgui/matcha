import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Layout from '../../hoc/Layout/Layout';
import './People.css'

class People extends Component {
    render () {
        return (
            <Layout>
                <section className="People">
                    <div>
                        <p> People </p>
                    </div>
                </section>
            </Layout>
        )
    }
}

export default People;