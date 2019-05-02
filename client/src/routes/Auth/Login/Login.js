import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import * as actions from '../../../store/actions/index'
import { checkInputValidity } from '../../../utils/input'
import Input from '../../../components/UI/Input/Input'
import Button from '../../../components/UI/Button/Button'
import Spinner from '../../../components/UI/Spinner/Spinner'

class Login extends Component {
	state = {
		email: '',
		password: '',
		errors: {},
		formIsValid: false
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

	checkValidity = (e, min, max) => {
		const name = e.target.name
		const value = e.target.value
		const error = checkInputValidity(name, value, min, max);

		this.setState({formIsValid: false});
		this.clearError(name);

		if (error) {
			this.addError(name, error)
		}

		this.setState( {[name]: value}, () => {
			if (this.state.email && this.state.password && Object.getOwnPropertyNames(this.state.errors).length === 0) {
			 	this.setState({formIsValid: true});
			}
		})
    }

	submitLogin = (event) => {
		event.preventDefault();
		this.props.onAuth(this.state.email, this.state.password);
	}

	render() {
		let form = (
			<form onSubmit={this.submitLogin} className="box">
					<Input error={this.state.errors.email} inputtype="input" label="Email" type="email" name="email" placeholder="Email" value={this.state.email} onChange={(e) => this.checkValidity(e, null, 40)}/>
					<Input error={this.state.errors.password} inputtype="password" label="Password" type="password" name="password" placeholder="Password" value={this.state.password} onChange={(e) => this.checkValidity(e, 6, 50)}/>
					
					{this.props.error 
					&& <center><p style={{color: 'red'}}>{this.props.error.message}</p></center>}
					
					<Button disabled={!this.state.formIsValid}> Login </Button>
			</form>
		)

		if (this.props.loading) {
            form = <Spinner /> 
		}

		let authRedirect = null;
        if (this.props.isAuthenticated) {
            authRedirect = <Redirect to='/profile' /> // Change Redirect to the good page
        }

		return (
			<div  className="inner-container">
				<div className="header"> Login </div>
				{form}
				{authRedirect}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
    return {
		loading: state.auth.loading,
		isAuthenticated: state.auth.token != null,
		error: state.auth.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAuth: (email, password) => dispatch(actions.auth(email, password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
