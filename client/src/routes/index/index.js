import React, { Component } from 'react'
import Login from './components/Login'
import Register from './components/Register'
import '../../styles/index/login.scss'

class App extends Component {
  state = {
    Login: true,
    Register: false
  }

  showLogin = () => {
    this.setState({Login: true, Register: false});
  }

  showRegister = () => {
    this.setState({Register: true, Login: false});
  }

  render() {
    return (
      <div className="root-container">
        <div className="box-controller">
          <div
            className={"controller " + (this.state.Login ? "selected-controller" : "")}
            onClick={this.showLogin}>
            Login
          </div>
          <div
            className={"controller " + (this.state.Register ? "selected-controller" : "")}
            onClick={this.showRegister}>
            Register
          </div>
        </div>
        <div className="box-container">
          {this.state.Login && <Login />}
          {this.state.Register && <Register/>}
        </div>
      </div>
    )
  }
}

export default App;