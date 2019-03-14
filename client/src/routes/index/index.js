import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom';

import SignUpForm from './components/SignUpForm';
import SignInForm from './components/SignInForm';
import '../../styles/home.css';

class App extends Component {
  render() {
    return (
        <div className="App">
          <div className="App__Aside"></div>
          <div className="App__Form">
            <div className="PageSwitcher">
                <NavLink exact to="/" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Sign In</NavLink>
                <NavLink to="/sign-up" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Sign Up</NavLink>
              </div>

              <div className="FormTitle">
                  <NavLink exact to="/" activeClassName="FormTitle__Link--Active" className="FormTitle__Link">Sign In</NavLink> or <NavLink to="/sign-up" activeClassName="FormTitle__Link--Active" className="FormTitle__Link">Sign Up</NavLink>
              </div>

              <Route exact path="/" component={SignInForm} />
              <Route path="/sign-up" component={SignUpForm}/>
          </div>

        </div>
    );
  }
}

export default App;