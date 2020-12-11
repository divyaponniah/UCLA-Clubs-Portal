import React from "react";
import "../styles/layout.css";
import {Link } from "react-router-dom";
import axios from 'axios';

export default class signUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      username: '',
      email: '',
      password1: '',  
      password2: '',
    };
  }

  submitHandler = (event) => {
    console.log('I HAVE BEEN SUMMONED');
    var u = document.getElementById('form_username').value;
    var e = document.getElementById('form_email').value;
    var pOne = document.getElementById('form_password1').value;
    var pTwo = document.getElementById('form_password2').value;

    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var strlen = e.length;
    var tempEmail = e.substring(strlen-8, strlen-4);
    var tempEmail2 = e.substring(strlen-10, strlen-4);
    console.log(tempEmail);
    console.log(tempEmail2);

    if(re.test(e) && (tempEmail == 'ucla' || tempEmail2 == 'g.ucla')) {
      if (pOne == pTwo) {
        console.log("CHECK");
        axios({
          method: 'post',
          url: 'http://127.0.0.1:8000/rest-auth/registration/',
          data: { 
            username: u,
            email: e,
            password1: pOne,
            password2: pTwo
           },
        }).then(function (response) {
          console.log(response)
          localStorage.setItem( 'token', response.data.key )
          console.log(localStorage.getItem('token'))
          window.location.href = "http://localhost:3000/#/clubs";
        }).catch(function (error) {
          console.log(error)
          alert('Account Exists');
          document.location.reload(true);
        });
      }
      else {
        alert('Passwords do not match');
        document.location.reload(true);
      } 
    }
    else {
      alert('Invalid Email');
      document.location.reload(true);
    }
  }

  render() {
    return (
      <div className="body" style={{backgroundColor: '#1488E0'}}>
        <p className="bodyHeader">Create your Account</p>
        <form className="form">
          
          <div className="inputTxt">
            <p>Username</p>
          </div>
          <input
            type='text'
            name='username'
            className="form_input"
            id='form_username'
          />

          <div className="inputTxt">
            <p>Email</p>
          </div>
          <input
            type='text'
            name='email'
            className="form_input"
            id='form_email'
          />

          <div className="inputTxt">
            <p>Password</p>
          </div>
          <input
            type='text'
            name='password1'
            className="form_input"
            id='form_password1'
          />

          <div className="inputTxt">
            <p>Re-type Password</p>
          </div>
          <input
            type='text'
            name='password2'
            className="form_input"
            id='form_password2'
          />
          </form>
        <button className="form_button" onClick={() => {this.submitHandler()}}>CREATE ACCOUNT</button>
      </div>  
    );
  }
}