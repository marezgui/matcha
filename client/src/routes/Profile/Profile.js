import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Input from '../../components/UI/Input/Input';
import { checkInputValidity, dateOfBirthTester } from '../../shared/utility';
import Map from './Map/Map';
import * as actions from '../../store/actions/index';
import './Profile.css';

class Profile extends Component {
  state = {
    values: {},
    errors: {},
    selectedFile: null,
  }

  componentDidMount = async () => {
    this._isMounted = true;
    // const { fetchTags, token, user: { idUser } } = this.props;
    // const tags = await fetchTags(token, idUser);
    const { user, user: { dateOfBirth } } = this.props;
    if (this._isMounted) {
      this.setState({ values: { ...user, password: '', dateOfBirth: new Date(dateOfBirth) } });
    }
    // console.log(tags);
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

  checkProfile = () => {
    const { token, onEdit } = this.props;
    axios
      .get('http://localhost:8080/api/edit/useriscomplete', { headers: { Authorization: `bearer ${token}` } })
      .then((res) => {
        console.log(res);
        onEdit('userIsComplete', true);
      })
      .catch((err) => {
        console.log(err.response);
        onEdit('userIsComplete', false);
      });
  };

  editData = (name, value) => {
    const { token, onEdit } = this.props;

    axios
      .put(`http://localhost:8080/api/edit/${name}`, { [name]: value }, { headers: { Authorization: `bearer ${token}` } })
      .then((res) => {
        console.log(res);
        onEdit(name, value);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }

  handleInput = (e, min, max) => {
    const { name, value } = e.target;
    const { values } = this.state;

    this.clearError(name);
    const error = checkInputValidity(name, value, min, max);
    if (error) {
      this.addError(name, error);
    }

    this.setState({ values: { ...values, [name]: value } },
      () => {
        if (!error) {
          this.editData(name, value);
          this.checkProfile();
        }
      });
  }

  handleDatePicker = (date) => {
    const { values } = this.state;
    const dateObj = new Date(date);
    const dateOfBirth = `${dateObj.getFullYear()}-${dateObj.getMonth() + 1}-${dateObj.getDate()}`;
    const current = new Date();
    const year = current.getFullYear();
    const age = year - dateObj.getFullYear();
    this.clearError('dateOfBirth');

    const error = dateOfBirthTester(dateOfBirth, age);
    if (error) { this.addError('dateOfBirth', error); }

    this.setState({ values: { ...values, dateOfBirth: date } },
      () => { if (!error) this.editData('dateOfBirth', dateOfBirth); });
  };

  changeUserLocation = ({ lat, lng }) => {
    const { token } = this.props;
    const location = { location: { latitude: lat, longitude: lng } };

    if (lat >= -85 && lat <= 85 && lng >= -180 && lng <= 180) {
      axios
        .put('http://localhost:8080/api/edit/location', location, { headers: { Authorization: `bearer ${token}` } })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log('error: ', err.response);
        });
    }
  }

  getBase64 = (file) => {
    let document = '';
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => {
      document = reader.result;
    };

    reader.onerror = (error) => {
      console.log('Error: ', error);
    };

    return document;
  }

  fileUploadHandler = () => {
    const { selectedFile } = this.state;
    let base64 = '';
    this.getBase64(selectedFile, (result) => {
      base64 = result;
      console.log(result);
    });

    console.log(this.state.selectedFile);
  }

  fileChangedHandler = (e) => {
    // console.log(e.target.files[0]);
    this.setState({ selectedFile: e.target.files[0] });
  }

  render() {
    const { values: { firstName,
      lastName, username, mail, password, genre, orientation, bio,
      location, dateOfBirth, tags }, errors } = this.state;


    setTimeout(() => {
      console.log(this.props.user);

    }, 3000);

    const photo = (
      <>
        <input type="file" onChange={this.fileChangedHandler} />
        <button onClick={this.fileUploadHandler}> Upload! </button>
      </>
    );

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
        <Input
          error={errors.dateOfBirth}
          inputtype="date"
          label="Date of birth"
          name="dateOfBirth"
          selected={dateOfBirth}
          onChange={this.handleDatePicker}
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
          rows="6"
          value={bio || ''}
          onChange={e => this.handleInput(e, null, 500)}
        />
      </form>
    );

    const tagsBox = (
      <form className="box">
        <div className="tags">
          {tags && tags.map(tag => (
            <p>
              {tag}
            </p>
          ))}
          {tags && tags[0]}
        </div>
      </form>
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
              {match}
              {biography}
            </div>
          </div>
          <div className="box-container">
            {/* {style={{ maxWidth: '50em', minWidth: '21em', width: '40em' }}} */}
            <div className="inner-container">
              <div className="header"> Your location </div>
              {localisation}
            </div>
          </div>
        </section>
        <section className="Profile2">
          <div className="box-container">
            <div className="inner-container">
              <div className="header"> Photo </div>
              {photo}
            </div>
          </div>
          <div className="box-container">
            <div className="inner-container">
              <div className="header"> Tags </div>
              {tagsBox}
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

const mapDispatchToProps = dispatch => ({
  onEdit: (name, value) => dispatch(actions.authUpdate(name, value)),
  fetchTags: (token, idUser) => dispatch(actions.getTags(token, idUser)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
