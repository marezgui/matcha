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

	checkValidity = (e) => {
		let value = e.target.value;
		this.setState( {[e.target.name]: value} );
    }

	submitLogin = (event) => {
		event.preventDefault();
		this.props.onAuth(this.state.login, this.state.password);
	}

	render() {
		let form = (
			<form onSubmit={this.submitLogin} className="box">
					<Input inputtype="input" label='Login' type="text" name="login" placeholder="Login" value={this.state.login} onChange={this.checkValidity}/>
					<Input inputtype="password" label="Password" type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.checkValidity}/>
					
					{this.props.error 
					&& <center><p style={{color: 'red'}}>{this.props.error.message}</p></center>}
					
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
