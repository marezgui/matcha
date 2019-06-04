import React, { Component } from 'react';
import axios from 'axios';
import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';
import { checkInputValidity } from '../../../shared/utility';

class Restore extends Component {
    state = {
      errors: {},
      password1: '',
      password2: '',
      formIsValid: false,
      matchError: '',
    };

    addError = (field, msg) => {
      const { errors } = this.state;
      errors[field] = msg;
      this.setState({ errors });
    };

    clearError = (field) => {
      const { errors } = this.state;
      delete errors[field];
      this.setState({ errors, matchError: '' });
    };

    checkValidity = async (e, min, max) => {
      const { name, value } = e.target;
      const error = checkInputValidity('password', value, min, max);

      this.setState({ formIsValid: false });
      this.clearError(name);

      if (error) {
        this.addError(name, error);
      }

      await this.setState({ [name]: value });

      const { password1, password2, errors } = this.state;

      if (password1 && password2 && Object.getOwnPropertyNames(errors).length === 0) {
        if (password1 !== password2) {
          this.setState(({ formIsValid: false, matchError: 'passwords must be similar' }));
        } else {
          this.setState(({ formIsValid: true, matchError: '' }));
        }
      }
    };

    submitRestore = (e) => {
      e.preventDefault();
      const { restoreKey } = this.props;
      const { password1 } = this.state;
      const password = password1;
      axios
        .put(`http://localhost:8080/api/users/forgotpassword/${restoreKey}`, { password })
        .then(() => {
          const { restored } = this.props;
          restored();
        })
        .catch((err) => {
          this.setState({ matchError: err.response.data.error });
        });
      // console.log(password1, password2);
    }

    render() {
      const { errors, password1, password2, formIsValid, matchError } = this.state;

      return (
        <>
          <div className="header"> Reset your password </div>
          <form onSubmit={this.submitRestore} className="box">
            <Input
              error={errors.password1}
              inputtype="password"
              label="New Password"
              type="password"
              name="password1"
              placeholder="Password"
              value={password1}
              onChange={e => this.checkValidity(e, 6, 50)}
            />
            <Input
              error={errors.password2}
              inputtype="password"
              label="Confirm"
              type="password"
              name="password2"
              placeholder="Confirm"
              value={password2}
              onChange={e => this.checkValidity(e, 6, 50)}
            />

            {matchError && (
              <center>
                <p style={{ color: 'tomato' }}>{matchError}</p>
              </center>
            )}

            <Button disabled={!formIsValid}> Reset </Button>
          </form>
        </>
      );
    }
}

export default Restore;
