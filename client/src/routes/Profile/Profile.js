import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Input from '../../components/UI/Input/Input';
import { checkInputValidity } from '../../shared/utility';
import Map from './Map/Map';
import './Profile.css';

class Profile extends Component {
  state = {
    values: {},
    errors: {},
  }

  componentDidMount() {
    this._isMounted = true;
    const { user } = this.props;
    this.setState({ values: { ...user, password: '' } });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  addError = (field, msg) => {
    const { errors } = this.state;
    this.setState({ errors: { ...errors, [field]: msg } });
  };

  clearError = (field) => {
    const { errors } = this.state;
    this.setState({ errors: { ...errors, [field]: null } });
  };

  handleInput = (e, min, max) => {
    const { name, value } = e.target;
    const { token } = this.props;
    const { values } = this.state;

    this.clearError(name);
    const error = checkInputValidity(name, value, min, max);
    if (error) {
      this.addError(name, error);
    }
    this.setState({ values: { ...values, [name]: value } }, () => {
      // console.log(error);
      if (!error) {
        // console.log(values);
        axios
          .put(`http://localhost:8080/api/edit/${name}`, { [name]: value }, { headers: { Authorization: `bearer ${token}` } })
          .then(() => {
            // console.log(res);
          })
          .catch(() => {
            // console.log(err.response);
          });
      }
    });
  }

  changeUserLocation = ({ lat, lng }) => {
    const { token } = this.props;

    if (lat >= -85 && lat <= 85 && lng >= -180 && lng <= 180) {
      console.log('location Changed', lat, lng);
      axios
        .put('http://localhost:8080/api/edit/location', { latitude: lat, longitude: lng }, { headers: { Authorization: `bearer ${token}` } })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log('error: ', err.response.data.error);
        });
    }
  }

  render() {
    const { values: { firstName,
      lastName, username, mail, password, genre, orientation, bio,
      location }, errors } = this.state;

    const perso = (
      <form className="box">
        <Input
          error={errors.firstName}
          inputtype="input"
          label="First Name"
          type="text"
          name="firstName"
          placeholder="First Name"
          value={firstName || ''}
          onChange={e => this.handleInput(e, 2, 15)}
        />
        <Input
          error={errors.lastName}
          inputtype="input"
          label="Last Name"
          type="text"
          name="lastName"
          placeholder="First Name"
          value={lastName || ''}
          onChange={e => this.handleInput(e, 2, 15)}
        />
      </form>
    );

    const account = (
      <form className="box">
        <Input
          error={errors.username}
          inputtype="input"
          label="Username"
          type="text"
          name="username"
          placeholder="Username"
          value={username || ''}
          onChange={e => this.handleInput(e, 3, 15)}
        />
        <Input
          error={errors.mail}
          inputtype="input"
          label="Mail"
          type="mail"
          name="mail"
          placeholder="Mail"
          value={mail || ''}
          onChange={e => this.handleInput(e, null, 40)}
        />
        <Input
          error={errors.password}
          inputtype="input"
          label="New Password"
          type="password"
          name="password"
          placeholder="Password"
          value={password || ''}
          onChange={e => this.handleInput(e, null, 40)}
        />
      </form>
    );

    const photo = (
      <>
      </>
    );

    const match = (
      <form className="box">
        <div className="ProfileMatch">
          <div>
            <FormLabel component="legend"><strong style={{ color: 'black' }}>Gender</strong></FormLabel>
            <RadioGroup
              aria-label="Gender"
              name="genre"
              value={genre || ''}
              onChange={e => this.handleInput(e)}
            >
              <FormControlLabel value="W" control={<Radio checked={genre === 'W'} color="primary" />} label="Female" />
              <FormControlLabel value="M" control={<Radio checked={genre === 'M'} color="primary" />} label="Male" />
              <FormControlLabel value="O" control={<Radio checked={genre === 'O'} color="primary" />} label="Other" />
            </RadioGroup>
          </div>
          <div>
            <FormLabel component="legend"><strong style={{ color: 'black' }}>Orientation</strong></FormLabel>
            <RadioGroup
              aria-label="Orientation"
              name="orientation"
              value={orientation || ''}
              onChange={e => this.handleInput(e)}
            >
              <FormControlLabel value="W" control={<Radio checked={orientation === 'W'} />} label="Female" />
              <FormControlLabel value="M" control={<Radio checked={orientation === 'M'} />} label="Male" />
              <FormControlLabel value="BI" control={<Radio checked={orientation === 'BI'} />} label="Other" />
            </RadioGroup>
          </div>
        </div>
      </form>
    );

    const biography = (
      <form className="box">
        <Input
          error={errors.bio}
          inputtype="textarea"
          label="Describe your self"
          type="text"
          name="bio"
          placeholder="Biography"
          rows="5"
          value={bio || ''}
          onChange={e => this.handleInput(e, null, 500)}
        />
      </form>
    );

    const tags = (
      <>
      </>
    );

    const localisation = (
      <form className="box">
        <Map
          changeUserLocation={this.changeUserLocation}
          location={location}
        />
      </form>
    );

    return (
      <section className="Profile">
        <section className="Profile1">
          <div className="box-container">
            <div className="inner-container">
              <div className="header"> Perso </div>
              {perso}
            </div>
          </div>
          <div className="box-container">
            <div className="inner-container">
              <div className="header"> Account </div>
              {account}
            </div>
          </div>
        </section>
        <section className="Profile2">
          <div className="box-container">
            <div className="inner-container">
              <div className="header"> Profile </div>
              {photo}
              {match}
              {biography}
              {tags}
            </div>
          </div>
          <div className="box-container">
            <div className="inner-container">
              <div className="header"> Your location </div>
              {localisation}
            </div>
          </div>
        </section>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  token: state.auth.token,
});

export default connect(mapStateToProps)(Profile);
