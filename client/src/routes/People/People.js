import React, { Component } from 'react';
import { connect } from 'react-redux'
import Layout from '../../components/Layout/Layout';
import User from '../../components/User/User'
import Badge from '@material-ui/core/Badge';
import './People.css'

class People extends Component {
    state = {
        user: this.props.auth.user
    }

    render () {
        console.log(this.props.auth)
        return (
            <Layout>
                <section className="People">
                    <div>
                    <User/>
                    </div>
                </section>
            </Layout>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps)(People);