import React from "react";
import "../styles/layout.css";
import {Link } from "react-router-dom";

export default class signUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      email: '',
      password: '', 
    };
  }

  render() {
    return (
      <div className="body" style={{backgroundColor: '#1488E0'}}>
        <p className="bodyHeader">Create your Account</p>
        <form onSubmit={this.submitHandler} className="form">
          
          <div className="inputTxt">
            <p>First Name</p>
          </div>
          <input
            type='text'
            name='First Name'
            className="form_input"
            onChange={this.myChangeHandler}
          />

          <div className="inputTxt">
            <p>Last Name</p>
          </div>
          <input
            type='text'
            name='Last Name'
            className="form_input"
            onChange={this.myChangeHandler}
          />

          <div className="inputTxt">
            <p>Email</p>
          </div>
          <input
            type='password'
            name='email2'
            className="form_input"
            onChange={this.myChangeHandler}
          />

          <div className="inputTxt">
            <p>Password</p>
          </div>
          <input
            type='password'
            name='password2'
            className="form_input"
            onChange={this.myChangeHandler}
          />
          
            <Link to="/login">
              <button type='submit' className="form_button">CREATE ACCOUNT</button>
            </Link>
        </form>
      </div>  
    );
  }
}