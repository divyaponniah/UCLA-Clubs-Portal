import React from "react";
import "../styles/layout.css";
import {Link } from "react-router-dom";
import axios from 'axios';

export default class login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      username: '',
      email: '',
      password: '', 
    };
  }

  submitHandler = (event) => {
    var u = document.getElementById('form_username').value;
    var e = document.getElementById('form_email').value;
    var p = document.getElementById('form_password').value;

    axios({
      method: 'post',
      url: 'http://127.0.0.1:8000/rest-auth/login/',
      data: { 
        username: u,
        email: e,
        password: p
       },
    }).then(function (response) {
      console.log(response)
      localStorage.setItem( 'token', 'token '+response.data.key )
      console.log(localStorage.getItem('token'))
      window.location.href = "http://localhost:3000/#/clubs";
      localStorage.setItem('username', u)
    }).catch(function (error) {
      console.log(error)
      alert('Try Again');
      document.location.reload(true);
    });
  }

  render() {
    return (
    <div className="body" style={{backgroundColor: '#1488E0'}}>
      <p className="bodyHeader">Welcome to the UCLA Clubs Portal</p>
      <p className="bodyHeader_1">Log in to my portal</p>
      <form className="form">
        
        <div className="inputTxt">
          <p>Username</p>
        </div>
        <input
          type='text'
          className="form_input"
          id='form_username'
        />

        <div className="inputTxt">
          <p>Email</p>
        </div>
        <input
          type='text'
          className="form_input"
          id='form_email'
        />
        
        <div className="inputTxt">
          <p>Password</p>
        </div>
        <input
          type='password'
          className="form_input"
          id='form_password'
        />
      </form>

      <button className="form_button" type='submit' onClick={() => {this.submitHandler()}}>LOG IN</button>

      <p className="bodyHeader_1">Don't have an account?</p>
      <div className="registerButton">
        <Link to="/signup">
          <button className="button">
            Create One
          </button>
        </Link>
    </div> 
  </div>
);
}
}