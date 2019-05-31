import React, { Component } from 'react';
import axios from 'axios';
import { checkInputValidity } from '../../../shared/utility';
import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';

class Register extends Component {
  state = {
    values: {},
    errors: {},
    formIsValid: false,
    loading: false,
    registered: false,
    serverError: null,
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

  checkInputValidity = async (e, min, max) => {
    const { name, value } = e.target;
    const { values } = this.state;

    this.clearError(name);

    const error = checkInputValidity(name, value, min, max);

    if (error) {
      this.addError(name, error);
    }

    const newValues = { ...values };
    newValues[name] = value;
    this.setState({ values: newValues }, () => {
      this.checkFormValidity();
    });
  };

  checkFormValidity = () => {
    const { errors, values } = this.state;
    const error = Object.getOwnPropertyNames(errors).length;
    const filled = Object.getOwnPropertyNames(values).length;

    this.setState({ formIsValid: false });

    if (!error && filled === 5) {
      this.setState({ formIsValid: true });
    }
  };

  submitRegister = (e) => {
    e.preventDefault();

    const { values } = this.state;
    this.setState({ loading: true });

    axios
      .post('users/add', values)
      .then(() => {
        this.setState({ loading: false });
        this.setState({ registered: true });
      })
      .catch((err) => {
        this.setState({ loading: false });
        this.setState({ serverError: err.response.data.error });
      });
  };

  render() {
    const { values, errors, serverError, formIsValid, loading, registered } = this.state;

    let form = (
      <form className="box" onSubmit={this.submitRegister}>
        <Input
          error={errors.username}
          inputtype="input"
          label="Username"
          type="text"
          name="username"
          placeholder="username"
          value={values.username || ''}
          onChange={e => this.checkInputValidity(e, 3, 15)}
        />

        <Input
          error={errors.firstName}
          inputtype="input"
          label="First name"
          type="text"
          name="firstName"
          placeholder="First name"
          value={values.firstName || ''}
          onChange={e => this.checkInputValidity(e, 2, 15)}
        />

        <Input
          error={errors.lastName}
          inputtype="input"
          label="Last name"
          type="text"
          name="lastName"
          placeholder="Last name"
          value={values.lastName || ''}
          onChange={e => this.checkInputValidity(e, 2, 15)}
        />

        <Input
          error={errors.mail}
          inputtype="input"
          label="Mail"
          type="email"
          name="mail"
          placeholder="Mail"
          value={values.mail || ''}
          onChange={e => this.checkInputValidity(e, null, 40)}
        />

        <Input
          error={errors.password}
          inputtype="password"
          label="Password"
          type="password"
          name="password"
          placeholder="Password"
          value={values.password || ''}
          onChange={e => this.checkInputValidity(e, 6, 50)}
        />

        {serverError && (
          <center>
            <p style={{ color: 'tomato' }}>{serverError}</p>
          </center>
        )}

        <Button disabled={!formIsValid}> Register </Button>
      </form>
    );

    if (loading) {
      form = <Spinner />;
    }

    if (registered) {
      form = (
        <div>
          <br />
          <center>
            <p>Congratulations, you are registered.</p>
            <p>Please check your mail to activate your account.</p>
          </center>
        </div>
      );
    }

    return (
      <div className="inner-container">
        <div className="header"> Register </div>
        {form}
      </div>
    );
  }
}

export default Register;
