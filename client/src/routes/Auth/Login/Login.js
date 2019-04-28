import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import Input from '../../../components/UI/Input/Input'
import Button from '../../../components/UI/Button/Button'
import Spinner from '../../../components/UI/Spinner/Spinner'
import * as actions from '../../../store/actions/index'

class Login extends Component {

	state = {
		login: '',
		password: ''
	}

	handleChange = (e) => {
        let value = e.target.value;
        let name = e.target.name;

		//console.log(this.state.login);
        this.setState({
          [name]: value
        });
    }

	submitLogin = (event) => {
		event.preventDefault();
		this.props.onAuth(this.state.login, this.state.password);
	}

	render() {
		let form = (
			<form onSubmit={this.submitLogin} className="box">
					{/*<label htmlFor="login">Login</label>*/}
					<Input inputtype="input" label='Login' type="text" name="login" placeholder="Login" value={this.state.login} onChange={this.handleChange}/>
					<Input inputtype="password" label="Password" type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange}/>
					<Button > Login </Button>
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
		isAuthenticated: state.auth.token != null
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAuth: (email, password) => dispatch(actions.auth(email, password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)

