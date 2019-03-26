import React, { Component } from 'react'

class Register extends Component {

	state = {
		nom: '',
		prenom: '',
		login: '',
		email: '',
		password: '',
		password2: '',
		pwdState: '',
		errors: []
	}
	
	submitRegister = (e) => {
		if (this.state.login === "") {
			this.showError("login", "login Cannot be empty!")
		}
		if (this.state.email === "") {
			this.showError("email", "Email Cannot be empty!")
		}
		if (this.state.password === "") {
			this.showError("password", "Password Cannot be empty!")
		}
	}

  showError = (field, msg) => {
    this.setState((prevState) => ({
      errors: [
        ...prevState.errors, {
          field,
          msg
        }
      ]
		}))
  }

  clearError = (field) => {
    this.setState((prevState) => {
      let newArr = []
      for (let err of prevState.errors) {
        if (field !== err.field) {
          newArr.push(err)
        }
      }
      return {errors: newArr}
    })
  }

  onLoginChange = (e) => {
    this.setState({login: e.target.value})
    this.clearError("login")
  }
  
  onEmailChange = (e) => {
    this.setState({email: e.target.value})
    this.clearError("email")
  }
  
  onPasswordChange = (e) => {
    this.setState({password: e.target.value})
		//this.clearError("password")
		this.setState({pwdState: "weak"})
		if (e.target.value.length > 8) {
			this.setState({pwdState: "medium"})
		} if (e.target.value.length > 12) {
			this.setState({pwdState: "strong"})
			console.log('strong')
		}
  }

	render() {
		let loginErr = null
		let passwordErr = null
		let emailErr = null

		for (let err of this.state.errors) {
			if (err.field === "login") {
				loginErr = err.msg
			}
			if (err.field === "password") {
				passwordErr = err.msg
			}
			if (err.field === "email") {
				emailErr = err.msg
			}
		}

		let pwdWeak = false
    let pwdMedium = false
		let pwdStrong = false
	
		if (this.state.pwdState === "weak") {
			pwdWeak = true
		} else if (this.state.pwdState === "medium") {
			pwdWeak = true
			pwdMedium = true
		} else if (this.state.pwdState === "strong") {
			pwdWeak = true
			pwdMedium = true
			pwdStrong = true
		}

		return (
			<div className="inner-container">
				<div className="header">
					Register
				</div>
				<div className="box">

					<div className="input-group">
						<label htmlFor="login">Login</label>
						<input
							type="text"
							name="login"
							className="login-input"
							placeholder="Login"
							onChange={this.onLoginChange}/>
							<small className="danger-error">{loginErr ? loginErr : ""} </small>
					</div>

					<div className="input-group">
						<label htmlFor="email">Email</label>
						<input 
							type="text" 
							name="email" 
							className="login-input" 
							placeholder="Email"
							onChange={this.onEmailChange}/>
						<small className="danger-error">{emailErr ? emailErr : ""} </small>
					</div>

					<div className="input-group">
						<label htmlFor="password">Password</label>
						<input
							type="password"
							name="password"
							className="login-input"
							placeholder="Password"
							onChange={this.onPasswordChange}/>
							{this.state.errors.password && <small> {this.state.errors.password} </small>}
							<small className="danger-error">{passwordErr ? passwordErr : ""} </small>
					</div>
					{ this.state.password && 
					<div className="password-state">
						<div className={"pwd pwd-weak " + (pwdWeak ? "show" : "")}></div>
						<div className={"pwd pwd-medium " + (pwdMedium ? "show" : "")}></div>
						<div className={"pwd pwd-strong " + (pwdStrong ? "show" : "")}></div>
					</div> }
					<button
						type="button"
						className="login-btn"
						onClick={this.submitRegister}>Register</button>
				</div>
			</div>
		);
	}
}

export default Register