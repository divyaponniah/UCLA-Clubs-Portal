import React from "react";
import "../styles/layout.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faCog } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';

export default class events extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
        userUrl:[],
        user: [],
        masterclubList: [],
        clubList: [],
        categories: [],
        profile_clubs: [],
        profile_club_ids: [],
        pk: '',
    };
  }

  toggleMenu() {
    var setting = document.getElementsByClassName("menu_setting")[0];
    var menu = document.getElementsByClassName("menu")[0];
    if (menu.style.display == "flex")
    {
        menu.style.display = "none";
        setting.style.backgroundColor = "#ffffff";
    }
    else
    {
        menu.style.display = "flex";
        setting.style.backgroundColor = "#1488e0";
    }
}

logOut() {
    // log out; reset the token and usernamed cached and return to login page
    localStorage.setItem("token", "");
    localStorage.setItem("username", "");
    window.location.href="#login";
}

  render() {
    return (
      <div className="body_nopadding" style={{position: 'relative'}}>
        <button className="menu_setting" style = {{backgroundColor: '#ffff'}} onClick={()=>{this.toggleMenu()}}><FontAwesomeIcon icon={faCog}/></button>
          <div className="menu">
            <div className="column">
                <h1 style={{marginTop: '0px'}}>{localStorage.getItem('username')}</h1>
                <a href = '#events' className="menu_button" style={{marginBottom: '16px'}}>Events</a>
                <a href = '#clubs' className="menu_button">Club Info</a>
            </div>
            <div className="column">
                <h2>SUBSCRIPTIONS</h2>
                { //this.state.profile_clubs.map((club, index) => {
                    //return(
                        //<div className="club_link">
                         //   <a>{club.name}</a>
                         //   <button className="trash_button" onClick={()=>{this.removeClub(club.pk)}}><FontAwesomeIcon icon={faTrash}/></button>
                       // </div>
                    //)
                //})
                }
                <div className="club_link">
                  <a href = '#xy'>club</a>
                  <button className="trash_button"> <FontAwesomeIcon icon={faTrash}/> </button>
                </div>
            </div>
            <button className="button" 
                style={{bottom: '0', position: 'absolute', marginBottom: '32px'}}
                onClick={()=>{this.logOut()}}
            >Log Out</button>
          </div>

    <div className="body" style={{position: 'absolute'}}>
        <p className="bodyHeader" style={{color: "#000000"}}>Events</p>
        <div className="event_wrap">
          <p className="date"> Monday, November 30th</p>
          <div className="event_card">
            <p className="event_title">CAD Workshop</p>
            <div className="event_container">
              <p className="event_info">SWE</p>
              <p className="event_info">6:30 - 7:30 PM</p>
              <p className="event_info">Location</p>
            </div>
          </div>
          <div className="event_card">
            <p className="event_title">Machine Learning Workshop #9</p>
            <div className="event_container">
              <p className="event_info">ACM</p>
              <p className="event_info">7:30 - 9 PM</p>
              <p className="event_info">Location</p>
            </div>
          </div>
        </div>
        <div className="event_wrap">
          <p className="date"> Tuesday, December 1st</p>
          <div className="event_card">
            <p className="event_title">Version Control Workshop</p>
            <div className="event_container">
              <p className="event_info">ACM</p>
              <p className="event_info">6:30 - 7:30 PM</p>
              <p className="event_info">Location</p>
            </div>
          </div>
          <div className="event_card">
            <p className="event_title">Machine Learning Workshop #9</p>
            <div className="event_container">
              <p className="event_info">ACM</p>
              <p className="event_info">7:30 - 9 PM</p>
              <p className="event_info">Location</p>
            </div>
          </div>
          <div className="event_card">
            <p className="event_title">CAD Workshop</p>
            <div className="event_container">
              <p className="event_info">SWE</p>
              <p className="event_info">6:30 - 7:30 PM</p>
              <p className="event_info">Location</p>
            </div>
          </div>
          <div className="event_card">
            <p className="event_title">Technical Interview Prep Workshop</p>
            <div className="event_container">
              <p className="event_info">SWE</p>
              <p className="event_info">6:30 - 7:30 PM</p>
              <p className="event_info">Location</p>
            </div>
          </div>
        </div>
        <div className="event_wrap">
          <p className="date"> Wednesday, December 2nd</p>
          <div className="event_card">
            <p className="event_title">Technical Interview Prep Workshop</p>
            <div className="event_container">
              <p className="event_info">SWE</p>
              <p className="event_info">6:30 - 7:30 PM</p>
              <p className="event_info">Location</p>
            </div>
          </div>
          <div className="event_card">
            <p className="event_title">Machine Learning Workshop #9</p>
            <div className="event_container">
              <p className="event_info">ACM</p>
              <p className="event_info">7:30 - 9 PM</p>
              <p className="event_info">Location</p>
            </div>
          </div>
          <div className="event_card">
            <p className="event_title">CAD Workshop</p>
            <div className="event_container">
              <p className="event_info">SWE</p>
              <p className="event_info">6:30 - 7:30 PM</p>
              <p className="event_info">Location</p>
            </div>
          </div>
        </div>
      </div>
      </div>
    );
  } 
} 