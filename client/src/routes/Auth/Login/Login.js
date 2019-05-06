import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import { checkInputValidity } from '../../../utils/input';
import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';

class Login extends Component {
  state = {
    email: '',
    password: '',
    errors: {},
    formIsValid: false,
  };

  addError = (field, msg) => {
    const { errors } = this.state;
    errors[field] = msg;
    this.setState({ errors });
  };

  clearError = (field) => {
    const { errors } = this.state;
    delete errors[field];
    this.setState({ errors });
  };

  checkValidity = (e, min, max) => {
    const { name, value } = e.target;
    const error = checkInputValidity(name, value, min, max);

    this.setState({ formIsValid: false });
    this.clearError(name);

    if (error) {
      this.addError(name, error);
    }

    this.setState(({ email, password, errors }) => {
      if (email && password && Object.getOwnPropertyNames(errors).length === 0) {
        return { [name]: value, formIsValid: true };
      }
      return { [name]: value };
    });
  };

  submitLogin = (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    const { onAuth } = this.props;

    onAuth(email, password);
  };

  render() {
    const { errors, email, password, formIsValid } = this.state;
    const { error, loading, isAuthenticated } = this.props;

    let form = (
      <form onSubmit={this.submitLogin} className="box">
        <Input
          error={errors.email}
          inputtype="input"
          label="Email"
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={e => this.checkValidity(e, null, 40)}
        />
        <Input
          error={errors.password}
          inputtype="password"
          label="Password"
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={e => this.checkValidity(e, 6, 50)}
        />

        {error && (
          <center>
            <p style={{ color: 'red' }}>{error.message}</p>
          </center>
        )}

        <Button disabled={!formIsValid}> Login </Button>
      </form>
    );

    if (loading) {
      form = <Spinner />;
    }

    let authRedirect = null;
    if (isAuthenticated) {
      authRedirect = <Redirect to="/profile" />; // Change Redirect to the good page
    }

    return (
      <div className="inner-container">
        <div className="header"> Login </div>
        {form}
        {authRedirect}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.auth.loading,
  isAuthenticated: state.auth.token != null,
  error: state.auth.error,
});

const mapDispatchToProps = dispatch => ({
  onAuth: (email, password) => dispatch(actions.auth(email, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
