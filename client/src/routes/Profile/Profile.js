import { Col, Row, Container, } from 'reactstrap';
import { Form, } from 'semantic-ui-react';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Profile.css';

class Profile extends Component {
  state = {
    user: [],
  }

  componentDidMount() {
    this._isMounted = true;
    const { user } = this.props;
    if (this._isMounted) { this.setState({ user }); }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handelChange = (e) => {
    const { name, value, checked, type } = e.target;
    const { user } = this.state;
    const newValues = { ...user };
    if (type === 'checkbox') {
      newValues[name] = checked;
    } else {
      newValues[name] = value;
    }
    this.setState({ user: newValues });
  }

  render() {
    const { user } = this.state;
    const { firstName, lastName, username, mail, bio, dateOfBirth, genre,
      orientation, notifications } = user;
    const PersonelInfo = (
      <Form className="bloc" onSubmit={this.editPerso}>
        <h4 className="ui dividing header">Personal Information</h4>
        <Form.Input
          fluid
          id="fistName"
          label="First name"
          placeholder="First name"
          iconPosition="left"
          icon="user"
          name="firstName"
          value={firstName}
          onChange={e => this.handelChange(e)}
        />
        <Form.Input
          fluid
          id="lastName"
          label="Last name"
          placeholder="Last name"
          iconPosition="left"
          icon="user"
          value={lastName}
          name="lastName"
          onChange={e => this.handelChange(e)}

        />
        <Form.Input
          fluid
          id="dateOfBirth"
          label="Date of Birth"
          type="date"
          iconPosition="left"
          icon="calendar alternate"
          value={dateOfBirth}
          name="dateOfBirth"
          onChange={e => this.handelChange(e)}

        />
        <h4 className="ui dividing header">Account Information</h4>
        <Form.Input
          fluid
          id="mail"
          label="Email"
          placeholder="Email"
          type="email"
          iconPosition="left"
          icon="at"
          value={mail}
          name="mail"
          onChange={e => this.handelChange(e)}

        />
        <Form.Input
          fluid
          id="username"
          label="Username"
          placeholder="Username"
          iconPosition="left"
          icon="user"
          value={username}
          name="username"
          onChange={e => this.handelChange(e)}
        />
        <Form.Input
          fluid
          id="password"
          label="Password"
          placeholder="Password"
          type="password"
          iconPosition="left"
          icon="key"
          name="password"
          onChange={e => this.handelChange(e)}

        />
        <Form.Input
          fluid
          id="confirmPassword"
          label="Confirm Password"
          placeholder="Confirm Password"
          type="password"
          iconPosition="left"
          icon="key"
          name="confirmPassword"
          onChange={e => this.handelChange(e)}

        />
      </Form>
    );

    const ProfilInfo = (
      <Form className="bloc" onSubmit={this.editProfil}>
        <h4 className="ui dividing header">Profile Information</h4>
        <Form.TextArea
          className="textplain"
          id="bio"
          label="Describe your self"
          placeholder="Write a cool description of your self"
          maxLength="500"
          rows="5"
          style={{ resize: 'none' }}
          value={bio}
          name="bio"
          onChange={e => this.handelChange(e)}
        />
        <div className="radio-group">
          <h4 className="ui dividing header">Genre</h4>
          <div className="form-check">
            <label htmlFor="man">
              <input
                id="man"
                type="radio"
                name="genre"
                value="M"
                className="form-check-input"
                checked={genre === 'M'}
                onChange={e => this.handelChange(e)}
              />
              Man
            </label>
          </div>
          <div className="form-check">
            <label htmlFor="women">
              <input
                id="women"
                type="radio"
                name="genre"
                value="W"
                className="form-check-input"
                checked={genre === 'W'}
                onChange={e => this.handelChange(e)}
              />
              Women
            </label>
          </div>
          <div className="form-check">
            <label htmlFor="other">
              <input
                id="other"
                type="radio"
                name="genre"
                value="O"
                className="form-check-input"
                checked={genre === 'O'}
                onChange={e => this.handelChange(e)}
              />
              Other
            </label>
          </div>
        </div>

        <div className="radio-group">
          <h4 className="ui dividing header">Orientation</h4>
          <div className="form-check">
            <label htmlFor="orim">
              <input
                id="orim"
                type="radio"
                name="orientation"
                value="M"
                className="form-check-input"
                checked={orientation === 'M'}
                onChange={e => this.handelChange(e)}
              />
              Man
            </label>
          </div>
          <div className="form-check">
            <label htmlFor="oriw">
              <input
                id="oriw"
                type="radio"
                name="orientation"
                value="W"
                className="form-check-input"
                checked={orientation === 'W'}
                onChange={e => this.handelChange(e)}
              />
              Women
            </label>
          </div>
          <div className="form-check">
            <label htmlFor="bi">
              <input
                id="bi"
                type="radio"
                name="orientation"
                value="BI"
                className="form-check-input"
                checked={orientation === 'BI'}
                onChange={e => this.handelChange(e)}
              />
              Bisexuel
            </label>
          </div>
        </div>
        <hr />
        <Form.Checkbox
          toggle
          id="notif"
          name="notifications"
          label="Receive notifications by email"
          checked={notifications}
          onChange={e => this.handelChange(e)}
        />
        <hr />
        <Form.Input
          fluid
          id="localisation"
          label="Localisation"
          placeholder="Localisation"
          iconPosition="left"
          icon="location arrow"
          name="localisation"
          onChange={e => this.handelChange(e)}
        />
      </Form>
    );

    const PhotoProfile = (
      <div className="bloc">
        <img
          alt="photoDeProfile"
          src="data:image/jpeg;base64, "
          className="photo profile"
        />
        <img
          alt="galerie"
          src="#"
          className="photo"
        />
      </div>
    );

    return (
      <Container>
        <Row>
          <Col>{PhotoProfile}</Col>
        </Row>
        <Row>
          <Col md="6" sm="12">{PersonelInfo}</Col>
          <Col md="6" sm="12">{ProfilInfo}</Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(Profile);
