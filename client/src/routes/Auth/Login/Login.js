import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar';
import * as actions from '../../../store/actions/index';
import Restore from '../Restore/Restore';
import { checkInputValidity } from '../../../shared/utility';
import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';

class Login extends Component {
  state = {
    username: '',
    password: '',
    errors: {},
    formIsValid: false,
    restore: false,
    checkMail: false,
    errorRestore: '',
    restoreKey: '',
    snackbar: {
      open: false,
      vertical: 'top',
      horizontal: 'center',
      message: 'Hello !',
    },
  };

  componentDidMount() {
    this._isMounted = true;
    const { location: { search } } = this.props;
    const params = new URLSearchParams(search);
    const restoreKey = params.get('restorekey');
    this.setState({ restoreKey });

    const confirmKey = params.get('confirmkey');
    if (confirmKey) {
      const { snackbar } = this.state;
      axios
        .put(`http://localhost:8080/api/users/confirmkey/${confirmKey}`)
        .then((res) => {
          if (this._isMounted) {
            this.setState({ snackbar: { ...snackbar,
              open: true,
              message: 'Your account has been activated' } });
          }
          console.log(res.data);
        })
        .catch((err) => {
          if (this._isMounted) {
            this.setState({ snackbar: { ...snackbar,
              open: true,
              message: err.response.data.error } });
          }
        });
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

    this.setState(({ username, password, errors }) => {
      if (username && password && Object.getOwnPropertyNames(errors).length === 0) {
        return { [name]: value, formIsValid: true };
      }
      return { [name]: value };
    });
  };

  submitLogin = (event) => {
    event.preventDefault();
    const { username, password } = this.state;
    const { onAuth } = this.props;
    onAuth(username, password);
  };

  restored = () => {
    const { snackbar } = this.state;
    this.setState({ restore: false, restoreKey: '' });
    this.setState({ snackbar: { ...snackbar,
      open: true,
      message: 'Your password has been restored' } });
  }

  handleRestore = () => {
    const { restore } = this.state;
    this.setState({ restore: !restore, restoreKey: '' });
  }

  submitRestore = (event) => {
    event.preventDefault();
    const { username } = this.state;
    axios
      .post('http://localhost:8080/api/users/forgotpassword/', { username })
      .then(() => {
        if (this._isMounted) {
          this.setState({ errorRestore: '', checkMail: true });
        }
        setTimeout(() => {
          if (this._isMounted) {
            this.setState({ checkMail: false, restore: false });
          }
        }, 4000);
      })
      .catch((err) => {
        if (this._isMounted) {
          this.setState({ errorRestore: err.response.data.error });
        }
        // console.log(err.response.data.error);
      });
  }

  autoLog = () => { // To remove
    const [username, password] = ['purpleelephant772', 'Password1234'];
    const { onAuth } = this.props;
    onAuth(username, password);
  };

  autoLog2 = () => { // To remove
    const [username, password] = ['tinybird710', 'Password1234'];
    const { onAuth } = this.props;
    onAuth(username, password);
  };

  autoLog3 = () => { // To remove
    const [username, password] = ['test', 'Password1234'];
    const { onAuth } = this.props;
    onAuth(username, password);
  };

  render() {
    const { errors, username, password, formIsValid,
      restore, checkMail, errorRestore, restoreKey,
      snackbar, snackbar: { vertical, horizontal, open, message } } = this.state;
    const { error, loading, isAuthenticated } = this.props;

    let form = <Spinner />;

    if (restoreKey) {
      form = <Restore restoreKey={restoreKey} restored={this.restored} />;
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
                error={errors.username}
                inputtype="input"
                label="Username"
                type="text"
                name="username"
                placeholder="Username"
                value={username}
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
              error={errors.username}
              inputtype="input"
              label="Username"
              type="text"
              name="username"
              placeholder="Username"
              value={username}
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
        <div>
          <Button clicked={this.autoLog3}> LogNewUser </Button>
        </div>
        {/* TO REMOVE */}

        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          key={`${vertical},${horizontal}`}
          open={open}
          onClose={() => this.setState({ snackbar: { ...snackbar, open: false } })}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={(
            <span id="message-id">
              {' '}
              {message}
              {' '}
            </span>
          )}
        />

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
