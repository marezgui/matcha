import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SignUpForm extends Component {
    constructor() {
        super();

        this.state = {
            nom: '',
            prenom: '',
            login: '',
            email: '',
            password: '',
            password2: '',
            error: '',
            hasAgreed: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        let target = e.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        let name = target.name;
        console.log(target);

        this.setState({
          [name]: value
        });
    }

    handleSubmit(e) {
        e.preventDefault();

        console.log('The form was submitted with the following data:');
        console.log(this.state);
    }

    render() {
        return (
        <div className="FormCenter">
            <form onSubmit={this.handleSubmit} className="FormFields">
              <div className="FormField">
                <label className="FormField__Label" htmlFor="nom">Nom</label>
                <input type="text" id="nom" className="FormField__Input" placeholder="Entrer votre nom" name="nom" value={this.state.nom} onChange={this.handleChange} />
              </div>
               <div className="FormField">
                <label className="FormField__Label" htmlFor="prenom">Prenom</label>
                <input type="text" id="prenom" className="FormField__Input" placeholder="Entrer votre Prenom" name="prenom" value={this.state.prenom} onChange={this.handleChange} />
              </div>
               <div className="FormField">
                <label className="FormField__Label" htmlFor="login">Login</label>
                <input type="text" id="login" className="FormField__Input" placeholder="Entrer votre Login" name="login" value={this.state.login} onChange={this.handleChange} />
              </div>
              <div className="FormField">
                <label className="FormField__Label" htmlFor="email">Adresse E-Mail</label>
                <input type="email" id="email" className="FormField__Input" placeholder="Entrer votre adresse email" name="email" value={this.state.email} onChange={this.handleChange} />
              </div>
              <div className="FormField">
                <label className="FormField__Label" htmlFor="password">Mot de Passe</label>
                <input type="password" id="password" className="FormField__Input" placeholder="Entrer votre Mot de Passe" name="password" value={this.state.password} onChange={this.handleChange} />
              </div>
                <div className="FormField">
                <label className="FormField__Label" htmlFor="password2">Confirmation Mot de Passe</label>
                <input type="password" id="password2" className="FormField__Input" placeholder="Confirmer votre Mot de Passe" name="password2" value={this.state.password2} onChange={this.handleChange} />
              </div>
              <div className="FormField">
                  <button className="FormField__Button mr-20">S'inscire</button> <Link to="/" className="FormField__Link">Deja membre ?</Link>
              </div>
              <div className> 
                  <div formErrors = {this.state.formErrors} /> 
              </ div>
            </form>
          </div>
        );
    }
}

export default SignUpForm;