import React from "react";
import "../styles/layout.css";

export default class xy extends React.Component {
  render() {
    return (
      <div className="body"> </div>
    );
  }

  render() {
    return (
      <div className="body">
        <p className="bodyHeader" style={{color: "#000000"}}> X Club Events</p>
        <div className="event_wrap">
          <p className="date"> Monday, November 30th</p>
          <div className="event_card">
            <p className="event_title">CAD Workshop</p>
            <div className="event_container">
              <p className="event_info">XY</p>
              <p className="event_info">6:30 - 7:30 PM</p>
              <p className="event_info">Location</p>
            </div>
          </div>
        </div>
        <div className="event_wrap">
          <p className="date"> Tuesday, December 1st</p>
          <div className="event_card">
            <p className="event_title">Version Control Workshop</p>
            <div className="event_container">
              <p className="event_info">XY</p>
              <p className="event_info">6:30 - 7:30 PM</p>
              <p className="event_info">Location</p>
            </div>
          </div>
        </div>
      </div>
    );
  } 
} 