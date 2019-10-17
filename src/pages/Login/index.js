import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./Login.css";
import { Alert } from "react-bootstrap";
import { len } from "gl-matrix/src/gl-matrix/vec3";
import authLib from "../../config/authlib"

export default class Login extends Component {
  constructor(props) {
    super(props);
    
    var user= authLib.getUserObj();
    if(user.accessToken) {      
      props.history.push('/admin');
    }
    
    this.state = {
      email: "",
      password: "",
      loginfailed: false
    };

  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  checkLogin = async (email, password) => {
    let self = this;
    fetch(global.backendURL + 'loginAuth', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'username': email,
        'password': password
      })
    }).then(function (response) {
      if (response.status == 200) return response.json();
      else return null;
    }).then(function (data) {
      if (data.token) {
        sessionStorage.setItem('userAuth', JSON.stringify(data));
        self.setState({ loginfailed: false });
        self.props.history.push('/admin');
        global.IsAuthenticated = true;
      }
      else {
        self.setState({ loginfailed: true });
      };
    }).catch(function (error) {
      console.log(error);
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    this.checkLogin(this.state.email, this.state.password);
  }

  render() {
    return (


      <div className="Login">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="email" bsSize="large">
            <ControlLabel>Username</ControlLabel>
            <FormControl
              autoFocus
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Password</ControlLabel>
            <FormControl
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
          <Button
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
          >
            Login
          </Button>
        </form>
        <Alert variant="danger" className={this.state.loginfailed ? 'visible' : 'hidden'}>
          Login failed, Please try again
          </Alert>
      </div>

    );
  }
}

