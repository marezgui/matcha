import React, { Component } from 'react'
import Input from '../../../components/UI/Input/Input'
import Button from '../../../components/UI/Button/Button'
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

	submitLogin = (event) => {
		event.preventDefault()
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
			<div  className="inner-container">
				<div className="header"> Login </div>
				<form onSubmit={this.submitLogin} className="box">
					{/*<label htmlFor="login">Login</label>*/}
					<Input inputtype="input" label='Login' type="text" name="login" placeholder="Login" value={this.state.login} onChange={this.handleChange}/>
					<Input inputtype="password" label="Password" type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange}/>
					<Button > Login </Button>
				</form>
			</div>
		);
	}
}

export default Login

