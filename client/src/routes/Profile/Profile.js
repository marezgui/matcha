import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { Switch } from 'antd';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import { Tag, notification } from 'antd';
import Slider from 'react-slick';
import Snackbar from '@material-ui/core/Snackbar';
import Input from '../../components/UI/Input/Input';
import Spinner from '../../components/UI/Spinner/Spinner';
import { checkInputValidity, dateOfBirthTester } from '../../shared/utility';
import Map from './Map/Map';
import Button from '../../components/UI/Button/Button';
import * as actions from '../../store/actions/index';
import './Profile.css';

class Profile extends Component {
  state = {
    values: {},
    errors: {},
    selectedFile: null,
    addTag: '',
    tagSuggestion: [],
    uploadError: '',
    snackbar: {
      open: false,
      vertical: 'top',
      horizontal: 'center',
      message: 'Hello !',
    },
    blockedUser: [],
  }

  componentDidMount = async () => {
    this._isMounted = true;
    const { user, user: { dateOfBirth }, token } = this.props;
    if (this._isMounted) {
      this.setState({ values: { ...user, password: '', dateOfBirth: new Date(dateOfBirth) } });
    }
    axios
      .get('http://localhost:8080/api/users/alltag')
      .then((res) => {
        if (this._isMounted) {
          this.setState({ tagSuggestion: res.data.alltag });
        }
      });
    axios
      .get('http://localhost:8080/api/social/getblockedlist', { headers: { Authorization: `bearer ${token}` } })
      .then((res) => {
        this.setState({ blockedUser: res.data.blockedTab });
      })
      .catch();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  newSnackbar = (message) => {
    const { snackbar } = this.state;
    this.setState({ snackbar: { ...snackbar, open: true, message } });
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
    const { token, onEdit } = this.props;
    const location = { location: { latitude: lat, longitude: lng } };

    if (lat >= -85 && lat <= 85 && lng >= -180 && lng <= 180) {
      axios
        .put('http://localhost:8080/api/edit/location', location, { headers: { Authorization: `bearer ${token}` } })
        .then((res) => {
          console.log(res);
          onEdit('location', { latitude: lat, longitude: lng });
        })
        .catch((err) => {
          console.log('error: ', err.response);
        });
    }
  }

  onRemoveTag = (e, tag) => {
    e.preventDefault();
    const { token, onEdit } = this.props;
    const { values: { tags } } = this.state;

    axios
      .delete('http://localhost:8080/api/edit/tag', { data: { tag }, headers: { Authorization: `bearer ${token}` } })
      .then((res) => {
        tags.forEach((tagState, id) => {
          if (tagState === tag) {
            tags.splice(id, 1);
          }
        });
        onEdit('tags', tags);
        // console.log(res);
      })
      .catch((err) => {
        // console.log(err.response);
      });
  }

  onAddTag = (e) => {
    e.preventDefault();
    const { addTag: { value } } = e.target;
    const { errors: { addTag }, values: { tags } } = this.state;
    const { token, user: { idUser }, onEdit } = this.props;

    if (!addTag) { // no-error
      axios
        .post('http://localhost:8080/api/edit/tag', { tag: value, idUser }, { headers: { Authorization: `bearer ${token}` } })
        .then(() => {
          // console.log(res);
          tags.push(value);
          onEdit('tags', tags);
          if (this._isMounted) {
            this.setState({ addTag: '' });
          }
        })
        .catch((err) => {
          this.addError('addTag', err.response.data.error);
          // console.log(err.response.data.error);
        });
    }
  }

  onTagChange = (e, min, max) => {
    const { name, value } = e.target;

    this.clearError(name);
    const error = checkInputValidity(name, value, min, max);
    if (error) {
      this.addError(name, error);
    }

    this.setState({ [name]: value });
  }

  handleSelectTag = (e) => {
    const { value } = e.target;
    const { values: { tags } } = this.state;
    const { token, user: { idUser }, onEdit } = this.props;

    if (value !== 'Suggestion') {
      axios
        .post('http://localhost:8080/api/edit/tag', { tag: value, idUser }, { headers: { Authorization: `bearer ${token}` } })
        .then(() => {
          tags.push(value);
          onEdit('tags', tags);
        })
        .catch((err) => {
          this.addError('addTag', err.response.data.error);
        });
    }
  }

  fileChangedHandler = (e) => {
    this.setState({ selectedFile: e.target.files[0] });
  }

  uploadImage = (toChange, selectedFile) => {
    const { token, onEdit } = this.props;
    const { values, values: { photo } } = this.state;
    const reader = new FileReader();

    reader.readAsDataURL(selectedFile);
    reader.onload = () => {
      console.log(toChange);
      this.setState({ values: { ...values, photo: { ...photo, [toChange]: reader.result, master: 'image1' } } },
        () => {
          const { photo } = this.state;
          const test = JSON.stringify(photo);

          /* const data = new FormData();
          data.append('photo', photo); */
          // console.log(reader.result);
          axios
            .put('http://localhost:8080/api/edit/photo', photo, { headers: { Authorization: `bearer ${token}` } })
            .then(() => { onEdit('photo', photo); })
            .catch((err) => {
              this.newSnackbar(err.response.data.error);
            });
        });
    };
    reader.onerror = () => { console.log('there are some problems'); };
  }

  fileUploadHandler = (e) => {
    e.preventDefault();
    const { selectedFile } = this.state;
    const toChange = e.target.photoSelect.value;
    // clear error & check
    if (selectedFile !== null) {
      const { selectedFile: { size, type } } = this.state;
      if (size && type) {
        if (type === 'image/jpeg' || type === 'image/jpg' || type === 'image/png') {
          if (size < 20000000) {
            // console.log(size, type);
            this.uploadImage(toChange, selectedFile);
          } else {
            this.newSnackbar('Too big !');
          }
        } else {
          this.newSnackbar('Invalid file !');
        }
      }
    } else {
      this.newSnackbar('Select a file first !');
    }
  }

  onOff = (checked) => {
    const { onEdit, token } = this.props;
    const { values } = this.state;

    this.setState({ values: { ...values, notifications: checked } },
      () => {
        axios
          .put('http://localhost:8080/api/edit/notif', { notif: checked }, { headers: { Authorization: `bearer ${token}` } })
          .then(() => { onEdit('notifications', checked); })
          .catch((err) => {
            this.newSnackbar(err.response.data.error);
          });
      });
  }

  render() {
    const settings = {
      dots: true,
      arrows: false,
      responsive: [
        {
          breakpoint: 766,
          settings: {
            arrows: false,
          },
        },
      ],
    };
    const { user: { idUser } } = this.props;
    const { values: { firstName,
      lastName, username, mail, password, genre, orientation, bio,
      location, dateOfBirth, tags, photo, notifications }, errors, addTag, tagSuggestion,
    snackbar, snackbar: { vertical, horizontal, open, message }, blockedUser } = this.state;

    let slider = (<Spinner />);
    console.log(blockedUser);
    if (photo !== undefined) {
      slider = (
        <Slider {...settings}>
          <img className="Grabber UserCardPictures" alt="" src={`data:image/jpg;base64,${photo[photo.master]}`} />
          {Object.keys(photo).map(
            (value, id) => (photo[value] && photo[value].length !== 6 ? <img key={`${photo[id]}-${idUser}`} alt="" className="Grabber UserCardPictures" src={`data:image/jpg;base64,${photo[value]}`} /> : null)
          )}
        </Slider>
      );
    }

    const photos = (
      <>
        <div style={{ width: '220px', marginLeft: '15px' }}>
          {slider}
        </div>
        <form onSubmit={this.fileUploadHandler}>
          <div className="SelectFile">
            <select name="photoSelect" className="Select">
              <option value="image1"> Profile </option>
              <option value="image2"> Picture n°2 </option>
              <option value="image3"> Picture n°3 </option>
              <option value="image4"> Picture n°4 </option>
              <option value="image5"> Picture n°5 </option>
            </select>
            <input type="file" onChange={this.fileChangedHandler} style={{ overflow: 'auto' }} />
          </div>
          <div>
            <center><Button> Upload! </Button></center>
          </div>
        </form>
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
      <form className="box" onSubmit={this.onAddTag}>
        <Input
          error={errors.addTag}
          placeholder="Add tags"
          type="text"
          name="addTag"
          value={addTag}
          onChange={e => this.onTagChange(e, 2, 15)}
        />
        <div className="Suggestion">
          <div className="Select">
            <select className="Select" onChange={this.handleSelectTag}>
              <option value="Suggestion">
                Suggestion
              </option>
              {tagSuggestion.map((tag, id) => (
                <option key={id} value={tag}>
                  {tag}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="YourTags">
          <p> Your tags: </p>
          <div className="tags">
            {tags && tags.map((tag, id) => (
              <Tag key={id} closable onClose={e => this.onRemoveTag(e, tag)}>
                {tag}
              </Tag>
            ))}
          </div>
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

    const switchNotif = (
      <div className="Box SwitchNotifBox">
        <p> Notifications </p>
        {notifications !== undefined && <Switch defaultChecked={notifications} onChange={this.onOff} />}
      </div>
    );

    return (
      <section className="Profile">
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
              {switchNotif}
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
          <div className="box-container" style={{ maxWidth: '294px' }}>
            <div className="inner-container">
              <div className="header"> Photo </div>
              {photos}
            </div>
          </div>
          <div className="box-container">
            <div className="inner-container">
              <div className="header"> Tags </div>
              {tagsBox}
            </div>
          </div>
        </section>
        <section className="Delete">
          <div className="BlockedList">
            <h3 style={{ borderBottom: '1px solid grey' }}> Users Blocked </h3>
            <div>
              {blockedUser.map(({ blockedUserId, idBlocked, userId }) => (
                <div key={idBlocked}>
                  <span>
                    <i className="fas fa-times" />
                    <p> NAME </p>
                  </span>
                  {`${blockedUserId}, ${idBlocked}, ${userId}`}
                </div>
              ))}
            </div>
          </div>
          <div className="Bye">
            <Button style={{ color: 'red' }}> DELETE MY ACCOUNT </Button>
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
