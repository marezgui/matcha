import React, { Component } from 'react'
import Input from '../../../components/UI/Input/Input'
import Button from '../../../components/UI/Button/Button'
import Spinner from '../../../components/UI/Spinner/Spinner'

class Register extends Component {

	state = {
		value: {},
		errors: {}, 
		formIsValid: false,
		loading: false, 
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
	
	checkValidity = (e, min, max, regex) => {
		const inputName = e.target.name
		const inputValue = e.target.value
		const newValueState = {...this.state.value}

		newValueState[inputName] = inputValue
		this.setState({value: newValueState})
		this.clearError(inputName)

		let reg = new RegExp(regex)
		//console.log(regex)
		//console.log(reg.test(inputValue))

		if (inputValue === "")
			this.addError(inputName, "Cannot be empty!")
		else if (inputValue.length < min)
			this.addError(inputName, min + " characters min.")
		else if (reg.test(inputValue))
			this.addError(inputName, "no match")
		else if (inputValue.length > max)
		this.addError(inputName, max + " characters max.")
	}
	
	submitRegister = (e) => {
		e.preventDefault()
	}

	render() {
		console.log("->", this.state)

		let form = (
			<form className="box" onSubmit={this.submitRegister}>
				<Input error={this.state.errors.login} inputtype="input" label="Login" type="text" name="login" placeholder="Login" onChange={(e) => this.checkValidity(e, 3, 15)}/>

				<Input error={this.state.errors.firstName} inputtype="input" label="First name" type="text" name="firstName" placeholder="First name" onChange={(e) => this.checkValidity(e, 2, 15, '/^[A-Z][A-Z]*(?:-[A-Z]+)*$/i')}/>

				<Input error={this.state.errors.lastName} inputtype="input" label="Last name" type="text" name="lastName" placeholder="Last name" onChange={(e) => this.checkValidity(e, 2, 15)}/>
				
				<Input error={this.state.errors.email} inputtype="input" label="Email" type="email" name="email" placeholder="Email" onChange={(e) => this.checkValidity(e, null, 40)}/>

				<Input error={this.state.errors.password} inputtype="password" label="Password" type="password" name="password" placeholder="Password" onChange={(e) => this.checkValidity(e, 6, 50)}/>

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

  /*onLoginChange = (e) => {
		this.clearError("login")
		const login = e.target.value
		this.setState((prevState) => ({
			value: {
					...prevState.value,
					login: login
			}
		}))
		if (login === "") {
			this.addError("login", "Login Cannot be empty!")
		}
  }
  
  onEmailChange = (e) => {
		this.clearError("email")
		const email = e.target.value
		this.setState((prevState) => ({
			value: {
					...prevState.value,
					email: email
			}
		}))
		if (email === "") {
			this.addError("email", "Email Cannot be empty!")
		}
  }
  
  onPasswordChange = (e) => {
		this.clearError("password")
		const password = e.target.value
		this.setState((prevState) => ({
			value: {
					...prevState.value,
					password: password
			}
		}))
		if (password === "") {
			this.addError("password", "Password Cannot be empty!")
		}
		console.log(e.target.name)
	}*/