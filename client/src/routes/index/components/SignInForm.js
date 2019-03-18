import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class SignInForm extends Component {
    constructor() {
        super();

        this.state = {
            login: '',
            password: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        let target = e.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        let name = target.name;

        this.setState({
          [name]: value
        });
    }

    handleSubmit(e) {
        e.preventDefault();

        console.log('The form was submitted with the following data:');
        console.log(this.state);
        
        if (this.state.login.length > 0) {
            console.log('API data:');
            axios.get('/api/users/' + this.state.login)
                .then(res => {
                    const user = res.data[0];
                    console.log(user.login);
                    console.log(user.password);
                    if (this.state.password === user.password) {
                        console.log('connected !');
                    }
                });
        }
    }

    render() {
        return (
        <div className="FormCenter">
            <form className="FormFields" onSubmit={this.handleSubmit}>
            <div className="FormField">
                <label className="FormField__Label" htmlFor="login">Login</label>
                <input type="text" id="login" className="FormField__Input" placeholder="Entrer votre login" name="login" value={this.state.login} onChange={this.handleChange} />
              </div>
              <div className="FormField">
                <label className="FormField__Label" htmlFor="password">Mot de passe</label>
                <input type="password" id="password" className="FormField__Input" placeholder="Entrer votre mot de passe" name="password" value={this.state.password} onChange={this.handleChange} />
              </div>
              <div className="FormField">
                  <button className="FormField__Button mr-20" >Se connecter</button> <Link to="/sign-up" className="FormField__Link">Vous n'etes pas inscrit ?</Link>
              </div>
            </form>
          </div>
        );
    }
}

export default SignInForm;