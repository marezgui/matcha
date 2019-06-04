import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import * as actions from '../../../store/actions/index';
import Restore from '../Restore/Restore';
import { checkInputValidity } from '../../../shared/utility';
import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';

class Login extends Component {
  state = {
    login: '',
    password: '',
    errors: {},
    formIsValid: false,
    restore: false,
    checkMail: false,
    errorRestore: '',
    restoreKey: '',
  };

  componentDidMount() {
    this._isMounted = true;
    if (this._isMounted) {
      const { location: { search } } = this.props;
      const params = new URLSearchParams(search);
      const restoreKey = params.get('restorekey');
      this.setState({ restoreKey });
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

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

    this.setState(({ login, password, errors }) => {
      if (login && password && Object.getOwnPropertyNames(errors).length === 0) {
        return { [name]: value, formIsValid: true };
      }
      return { [name]: value };
    });
  };

  submitLogin = (event) => {
    event.preventDefault();
    const { login, password } = this.state;
    const { onAuth } = this.props;
    onAuth(login, password);
  };

  handleRestore = () => {
    const { restore } = this.state;
    this.setState({ restore: !restore, restoreKey: '' });
  }

  submitRestore = (event) => {
    event.preventDefault();
    const { login } = this.state;
    axios
      .post('http://localhost:8080/api/users/forgotpassword/', { username: login })
      .then(() => {
        this.setState({ errorRestore: '', checkMail: true });
        setTimeout(() => {
          this.setState({ checkMail: false, restore: false });
        }, 4000);
      })
      .catch((err) => {
        this.setState({ errorRestore: err.response.data.error });
        // console.log(err.response.data.error);
      });
  }

  autoLog = () => { // To remove
    const [login, password] = ['saddog622', 'Password1234'];
    const { onAuth } = this.props;
    onAuth(login, password);
  };

  autoLog2 = () => { // To remove
    const [login, password] = ['yellowzebra609', 'Password1234'];
    const { onAuth } = this.props;
    onAuth(login, password);
  };

  render() {
    const { errors, login, password, formIsValid,
      restore, checkMail, errorRestore, restoreKey } = this.state;
    const { error, loading, isAuthenticated } = this.props;

    let form = <Spinner />;

    if (restoreKey) {
      form = <Restore restoreKey={restoreKey} handleRestore={this.handleRestore} />;
    } else if (restore) {
      if (checkMail) {
        form = (
          <center style={{ marginBotttom: '15px' }}> Done, check your mails. </center>
        );
      } else {
        form = (
          <>
            <div className="header"> Restore </div>
            <form onSubmit={this.submitRestore} className="box">
              <Input
                error={errors.login}
                inputtype="input"
                label="Username"
                type="text"
                name="login"
                placeholder="Username"
                value={login}
                onChange={e => this.checkValidity(e, null, 40)}
              />

              {errorRestore && (
              <center>
                <p style={{ color: 'tomato' }}>{errorRestore}</p>
              </center>
              )}

              <Button disabled={false}> Send </Button>
            </form>
          </>
        );
      }
    } else {
      form = (
        <>
          <div className="header"> Login </div>
          <form onSubmit={this.submitLogin} className="box">
            <Input
              error={errors.login}
              inputtype="input"
              label="Username"
              type="text"
              name="login"
              placeholder="Username"
              value={login}
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
              <p style={{ color: 'tomato' }}>{error}</p>
            </center>
            )}

            <Button disabled={!formIsValid}> Login </Button>
          </form>
        </>
      );
    }

    if (loading) {
      form = <Spinner />;
    }

    let authRedirect = null;
    if (isAuthenticated) {
      authRedirect = <Redirect to="/profile" />; // Change Redirect to the good page
    }

    return (
      <div className="inner-container">
        {/* TO REMOVE */}
        <div>
          <Button clicked={this.autoLog}> LogUser1 </Button>
        </div>
        <Button clicked={this.autoLog2}> LogUser2 </Button>
        {/* TO REMOVE */}
        {form}
        {authRedirect}
        <p className="RestoreLink Pointer" role="presentation" onClick={this.handleRestore}>
          {!restore ? 'Restore your password.' : 'Back to Login'}
        </p>
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
  onAuth: (mail, password) => dispatch(actions.auth(mail, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
