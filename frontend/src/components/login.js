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
    return (<div className="background">
    <div className="welcomeTxt">
      <p>Welcome to the UCLA Clubs Portal</p>
    </div>
    <div className="logInPortalTxt">
      <p>Log in to my portal</p>
    </div>
    <form onSubmit={this.submitHandler}>
      <div className="emailTxt">
        <p>Email</p>
      </div>
      <input
        type='text'
        name='email'
        id='ip1'
        onChange={this.myChangeHandler}
      />
      <div className="passwordTxt">
        <p>Password</p>
      </div>
      <input
        type='text'
        name='password'
        id='ip2'
        onChange={this.myChangeHandler}
      />
      <Link to="/clubs"><button
        type='submit'
        id='ip3'>LOG IN</button></Link>
    </form>
    <div className="registerText">
      <p>Don't have an account?</p>
    </div>
    <div className="registerButton">
      <Link to="/signup">
        <button id='ib1'>
          Create One.
        </button>
      </Link>
    </div> 
  </div>
);
}
}