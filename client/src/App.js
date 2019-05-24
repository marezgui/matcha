import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from 'store/actions';
import Layout from 'components/Layout/Layout';
import Auth from 'routes/Auth/Auth';
import Profile from 'routes/Profile/Profile';
import People from 'routes/People/People';
import Notifications from 'routes/Notifications/Notifications';
import Logout from 'routes/Auth/Logout/Logout';

class App extends Component {
  componentDidMount() {
    const { onTryAutoSignup } = this.props;

    onTryAutoSignup();
  }

  render() {
    const { isAuthenticated } = this.props;
    // eslint-disable-next-line no-shadow
    const DefaultLayout = ({ component: Component, ...rest }) => (
      <Route
        {...rest}
        render={matchProps => (
          <Layout>
            <Component {...matchProps} />
          </Layout>
        )}
      />
    );

    let routes = (
      <Switch>
        <Route exact path="/" component={Auth} />
        <Route path="/register" component={Auth} />
        <Redirect to="/" />
      </Switch>
    );

    if (isAuthenticated) {
      routes = (
        <Switch>
          <DefaultLayout path="/people" component={People} />
          <DefaultLayout path="/notifications" component={Notifications} />
          <DefaultLayout path="/profile" component={Profile} />
          <Route path="/logout" component={Logout} />
          <Redirect to="/people" />
        </Switch>
      );
    }

    return <div>{routes}</div>;
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.token !== null,
});

const mapDispatchToProps = dispatch => ({
  onTryAutoSignup: () => dispatch(actions.authCheckState()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
