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

  submitHandler = (event) => {
    event.preventDefault();
    alert("Logging In");
    //if it's valid it'll take you to the home page
  }

  inputHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({[nam]: val});
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
            type='text'
            name='email2'
            className="form_input"
            onChange={this.myChangeHandler}
          />

          <div className="inputTxt">
            <p>Password</p>
          </div>
          <input
            type='text'
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