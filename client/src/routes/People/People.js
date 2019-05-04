import React, { Component } from 'react';
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