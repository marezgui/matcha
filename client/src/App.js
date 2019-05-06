import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './store/actions';
import Auth from './routes/Auth/Auth';
import Profile from './routes/Profile/Profile';
import People from './routes/People/People';
import Logout from './routes/Auth/Logout/Logout';

class App extends Component {
  componentDidMount() {
    const { onTryAutoSignup } = this.props;

    onTryAutoSignup();
  }

  render() {
    const { isAuthenticated } = this.props;

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
          <Route path="/people" component={People} />
          <Route path="/profile" component={Profile} />
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
