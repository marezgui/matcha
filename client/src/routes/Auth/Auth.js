import React from 'react';
import { Route, NavLink, Switch } from 'react-router-dom';
import Login from './Login/Login';
import Register from './Register/Register';
import './Auth.scss';

const auth = () => (
  <div className="root-container">
    <div className="box-controller">
      <NavLink exact to="/" className="NavLink" activeClassName="Active">
        Login
      </NavLink>

      <NavLink to="/register" className="NavLink" activeClassName="Active">
        Register
      </NavLink>
    </div>
    <div className="box-container">
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/register" component={Register} />
      </Switch>
    </div>
  </div>
);

export default auth;
