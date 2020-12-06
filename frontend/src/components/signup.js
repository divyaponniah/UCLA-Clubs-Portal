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
      <div className="background">
        
        <div className="createAccountTxt">
          <p>Create your Account</p>
        </div>
        
        <form onSubmit={this.submitHandler}>
          
          <div className="firstNameText">
            <p>First Name</p>
          </div>
          <input
            type='text'
            name='First Name'
            id='ip5'
            onChange={this.myChangeHandler}
          />

          <div className="lastNameText">
            <p>Last Name</p>
          </div>
          <input
            type='text'
            name='Last Name'
            id='ip6'
            onChange={this.myChangeHandler}
          />

          <div className="emailText2">
            <p>Email</p>
          </div>
          <input
            type='text'
            name='email2'
            id='ip7'
            onChange={this.myChangeHandler}
          />

          <div className="passwordText2">
            <p>Password</p>
          </div>
          <input
            type='text'
            name='password2'
            id='ip8'
            onChange={this.myChangeHandler}
          />
          
          <Link to="/login"><button
            type='submit'
            id='ib2'>CREATE ACCOUNT</button></Link>
        </form>
      </div>  
    );
  }
}