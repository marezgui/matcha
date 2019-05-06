import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Icon } from 'semantic-ui-react';
import Layout from '../../components/Layout/Layout';
import Matthew from '../../assets/images/matthew.png';
import './People.css';

class People extends Component {
  state = {};

  render() {
    const extra = (
      <p>
        <Icon name="user" />
        16 Friends
      </p>
    );

    return (
      <Layout>
        <section className="People">
          <div className="UserCards">
            <Card
              image={Matthew}
              header="Elliot Baker"
              meta="Friend"
              description="Elliot is a sound engineer living in Nashville who enjoys playing guitar and hanging with his cat."
              extra={extra}
            />
          </div>
        </section>
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(People);
