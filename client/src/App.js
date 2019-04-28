import Auth from './routes/Auth/Auth';
import Profile from './routes/Profile/Profile';
import Logout from './routes/Logout/Logout';
import React, { Component } from 'react';
import {Route, Switch, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import * as actions from './store/actions'

class App extends Component {
    componentDidMount () {
      this.props.onTryAutoSignup()
    }

    render() {
      return (
        <div>
          <Switch>
              <Route exact path="/" component={Auth} />
              <Route path="/register" component={Auth} />
              <Route path="/profile" component={Profile}/>
              <Route path="/logout" component={Logout}/>
              <Route render={() => <h1>Not Found</h1>}/> {/*Cant be a component*/ /* <Layout/> */}
          </Switch>
        </div>
      );
    }
}
  
const mapDispatchToProps = (dispatch) => {
    return {
        onTryAutoSignup: () => dispatch(actions.authCheckState())
    }
}

export default withRouter(connect(null, mapDispatchToProps)(App));