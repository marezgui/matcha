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
		registered: false,
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
		let error = Object.getOwnPropertyNames(this.state.errors).length;
		let length = Object.getOwnPropertyNames(this.state.values).length;

		this.setState({formIsValid: false});

		if (!error && length === 5) {
			this.setState({formIsValid: true});
		}
	}

	submitRegister = (e) => {
		e.preventDefault();

		this.setState({loading: true});

		axios.post('users', this.state.values)
        .then((response) => {
			this.setState({loading: false});
			this.setState({registered: true});
        })
        .catch((err) => {
			this.setState({loading: false});
			this.setState({serverError: err.response.data.error})
        });
	}

	render() {
		let form = (
			<form className="box" onSubmit={this.submitRegister}>
				<Input error={this.state.errors.login} inputtype="input" label="Login" type="text" name="login" placeholder="Login" value={this.state.values.login || ''} onChange={(e) => this.checkInputValidity(e, 3, 15)} /> {/*onChange={() => this.onChange('login', this.state.values.login)}*/}

				<Input error={this.state.errors.firstName} inputtype="input" label="First name" type="text" name="firstName" placeholder="First name" value={this.state.values.firstName || ''} onChange={(e) => this.checkInputValidity(e, 2, 15)}/>

				<Input error={this.state.errors.lastName} inputtype="input" label="Last name" type="text" name="lastName" placeholder="Last name" value={this.state.values.lastName || ''} onChange={(e) => this.checkInputValidity(e, 2, 15)}/>
				
				<Input error={this.state.errors.email} inputtype="input" label="Email" type="email" name="email" placeholder="Email" value={this.state.values.email || ''} onChange={(e) => this.checkInputValidity(e, null, 40)}/>

				<Input error={this.state.errors.password} inputtype="password" label="Password" type="password" name="password" placeholder="Password" value={this.state.values.password || ''} onChange={(e) => this.checkInputValidity(e, 6, 50)}/>

				{this.state.serverError
					&& <center><p style={{color: 'red'}}>{this.state.serverError}</p></center>}

				<Button disabled={!this.state.formIsValid}> Register </Button>
			</form>
		)

		if (this.state.loading) {
			form = <Spinner />
		}

		if (this.state.registered) {
			form = (
				<div>
					<br />
					<center>
						<p>Congratulations, you are registered.</p>
						<p>Please check your mail to activate your account.</p>
					</center>
				</div>
			)
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