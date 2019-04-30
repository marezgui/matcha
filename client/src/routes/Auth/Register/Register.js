import React, { Component } from 'react'
import axios from 'axios'
import { checkInputValidity } from '../../../utils/input'
import Input from '../../../components/UI/Input/Input'
import Button from '../../../components/UI/Button/Button'
import Spinner from '../../../components/UI/Spinner/Spinner'

class Register extends Component {
	state = {
		values: {},
		errors: {},
		formIsValid: false,
		loading: false,
		serverError: null
	}

	addError = (field, msg) => {
		const errors = {...this.state.errors}
		errors[field] = msg
    	this.setState({errors: errors})
  	}

  	clearError = (field) => {
		const errors = {...this.state.errors}
		delete errors[field]
		this.setState({errors: errors})
	}

	checkInputValidity = async (e, min, max) => {
		const name = e.target.name
		const value = e.target.value

		this.clearError(name)

		const error = checkInputValidity(name, value, min, max);

		if (error) {
			this.addError(name, error)
		}

		const newValues = {...this.state.values}
		newValues[name] = value
		this.setState({values: newValues}, () => {
			this.checkFormValidity()
		})
	}

	checkFormValidity = () => {
		let error = false;
		let length = 0;

		this.setState({formIsValid: false});

		for (let prop in this.state.values) {
			length++;
		}

		for (let prop in this.state.errors) {
			if (this.state.errors[prop]) {
				error = true;
			}
		}
		
		if (!error && length === 5) {
			this.setState({formIsValid: true});
		}
	}

	submitRegister = (e) => {
		e.preventDefault();

		axios.post('users', this.state.values)
        .then((response) => {
            console.log("Registered", response.data);
        })
        .catch((err) => {
			this.setState({serverError: err.response.data.error})
        });
	}

	render() {
		let form = (
			<form className="box" onSubmit={this.submitRegister}>
				<Input error={this.state.errors.login} inputtype="input" label="Login" type="text" name="login" placeholder="Login" onChange={(e) => this.checkInputValidity(e, 3, 15)} /> {/*onChange={() => this.onChange('login', this.state.values.login)}*/}

				<Input error={this.state.errors.firstName} inputtype="input" label="First name" type="text" name="firstName" placeholder="First name" onChange={(e) => this.checkInputValidity(e, 2, 15)}/>

				<Input error={this.state.errors.lastName} inputtype="input" label="Last name" type="text" name="lastName" placeholder="Last name" onChange={(e) => this.checkInputValidity(e, 2, 15)}/>
				
				<Input error={this.state.errors.email} inputtype="input" label="Email" type="email" name="email" placeholder="Email" onChange={(e) => this.checkInputValidity(e, null, 40)}/>

				<Input error={this.state.errors.password} inputtype="password" label="Password" type="password" name="password" placeholder="Password" onChange={(e) => this.checkInputValidity(e, 6, 50)}/>

				{this.state.serverError
					&& <center><p style={{color: 'red'}}>{this.state.serverError}</p></center>}

				<Button disabled={!this.state.formIsValid}> Register </Button>
			</form>
		)

		if (this.state.loading) {
			form = <Spinner />
		}

		return (
			<div className="inner-container">
				<div className="header"> Register </div>
				{form}
			</div>
		)
	}
}

export default Register