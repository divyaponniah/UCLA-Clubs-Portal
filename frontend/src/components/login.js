import React from "react";
import "../styles/layout.css";
import {Link } from "react-router-dom";

export default class login extends React.Component {
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
      <p className="bodyHeader">Welcome to the UCLA Clubs Portal</p>
      <p className="bodyHeader_1">Log in to my portal</p>
      <form className="form" onSubmit={this.submitHandler}>
        <div className="inputTxt">
          <p>Email</p>
        </div>
        <input
          type='text'
          name='email'
          className="form_input"
          onChange={this.myChangeHandler}
        />
        <div className="inputTxt">
          <p>Password</p>
        </div>
        <input
          type='text'
          name='password'
          className="form_input"
          onChange={this.myChangeHandler}
        />
        <Link to="/clubs">
          <button className="form_button" type='submit'>LOG IN</button>
        </Link>
      </form>
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