import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ProgressButton from 'react-progress-button';
import axios from 'axios';
import "./login.css";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      buttonState: ""
    };

    this.setField = this.setField.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  setField(field, e) {
    this.setState({
      [field]: e.target.value
    })
  }

  handleClick(event) {
    event.preventDefault();
    this.setState({ buttonState: 'loading' });

    axios.post('https://api.github.com/users/maecapozzi')
      .then(function (result) {
        this.setState({ buttonState: 'success' });
      })
      .catch(function (err) {
        this.setState({ buttonState: 'error' });
      });
  }

  render() {
    const { email, password } = this.state
    return (
      <div className="login-form">
        <h1>Miami Wallet</h1>
        <form>
          <div className="form-group ">
            <input type="text" className="form-control" placeholder="Email" id="Email"
              value={email} onChange={this.setField.bind(null, 'email')} />
            <FontAwesomeIcon icon="user" className="fa" />
          </div>
          <div className="form-group log-status">
            <input type="password" className="form-control" placeholder="Password"
              id="Password" value={password} onChange={this.setField.bind(null, 'password')} />
            <FontAwesomeIcon icon="lock" className="fa" />
          </div>
          <span className="alert">Invalid Credentials</span>
          <a className="link">Forgot your password?</a>
          <ProgressButton className='log-btn' onClick={this.handleClick}
            state={this.state.buttonState}>Login</ProgressButton>
        </form>
      </div>
    );
  }
}