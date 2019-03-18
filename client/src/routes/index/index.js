import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom';

import SignUpForm from './components/SignUpForm';
import SignInForm from './components/SignInForm';
import '../../styles/home.css';

class App extends Component {
  render() {
    return (
      <div className="App">
         
         <div className="App__Aside">
         </div>

         <div className="App__Form">
            <div className="PageSwitcher">
                  <NavLink exact to="/" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Se connecter</NavLink>
                  <NavLink to="/sign-up" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">S'inscrire</NavLink>
            </div>

            <div className="FormTitle">
                  <NavLink exact to="/" activeClassName="FormTitle__Link--Active" className="FormTitle__Link">Se connecter</NavLink> ou 
                  <NavLink to="/sign-up" activeClassName="FormTitle__Link--Active" className="FormTitle__Link">S'inscrire</NavLink>
            </div>   
            <Route exact path="/" component={SignInForm} />
            <Route path="/sign-up" component={SignUpForm}/>
         </div>
      </div>
    );
  }
}

export default App;