import React, { Component } from 'react'
import axios from 'axios'

class Login extends Component {

	state = {
		login: '',
		password: ''
	}

	handleChange = (e) => {
        let value = e.target.value;
        let name = e.target.name;

        this.setState({
          [name]: value
        });
    }

	submitLogin = (e) => {
		console.log('submited')
		if (this.state.login.length > 0) {
            console.log('API data:');
            axios.get('/api/users/' + this.state.login)
                .then(res => {
                    const user = res.data[0];
                    console.log(user.login);
                    console.log(user.password);
                    if (this.state.password === user.password) { // bcrypt
                        console.log('connected !');
                    }
        	});
		}
	}

	render() {
		return (
			<div className="inner-container">
				<div className="header">
				Login
				</div>
				<div className="box">

				<div className="input-group">
						<label htmlFor="login">Login</label>
						<input
						type="text"
						name="login"
						className="login-input"
						placeholder="Login"
						value={this.state.login}
						onChange={this.handleChange}/>
				</div>

				<div className="input-group">
						<label htmlFor="password">Password</label>
						<input
						type="password"
						name="password"
						className="login-input"
						placeholder="Password"
						value={this.state.password}
						onChange={this.handleChange}/>
				</div>

				<button
						type="button"
						className="login-btn"
						onClick={this.submitLogin}>
						Login 
				</button>
				</div>
			</div>
		);
	}
}

export default Login

