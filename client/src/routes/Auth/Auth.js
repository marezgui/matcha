import React from 'react';
import { Route, NavLink, Switch } from 'react-router-dom';
import { Logo } from '../../components/UI/Icons/Icons';
import Login from './Login/Login';
import Register from './Register/Register';
import './Auth.scss';

const auth = () => (
  <div className="root-container">
    <div className="logo-container">
      <Logo />
    </div>
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
