import React from "react";
import "../styles/layout.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faCog } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';

export default class clubevents extends React.Component {
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
        events: [],
        curr_club: '',
    };
  }

  componentDidMount() { 
    const categorySet = new Set();
    // all club data
    axios({
        method: 'get',
        url: "http://127.0.0.1:8000/clubs/",
        headers: {"authorization": localStorage.getItem('token')},
    }).then((response) => {
        console.log("all club data:")
        console.log(response)
        this.setState({clubList: response.data});
        this.setState({masterclubList: response.data});
        // set the category buttons by grabbing all categories
        this.state.clubList.map((club, index) =>
        {
            categorySet.add(club.category);
        })
        this.setState({categories: [...categorySet]});
        console.log(this.state.clubList);
        console.log(this.state.categories);
        console.log(localStorage.getItem('token'))
    }).catch(function (error) {
        console.log(error)
    });

    // user club profiles
    axios({
        method: 'get',
        url: "http://127.0.0.1:8000/profiles/",
        headers: {"authorization": localStorage.getItem('token')},
    }).then((response) => {
        console.log("user club profiles:")
        console.log(response)
        this.setState({userUrl: response.data[0].url})
        console.log(this.state.userUrl)
        this.setState({profile_clubs: response.data[0].clubs})
        console.log(this.state.profile_clubs)
        this.setState({profile_club_ids: response.data[0].club_ids})
        console.log(this.state.profile_club_ids)
    }).catch(function (error) {
        console.log(error)
    });

    // club events info
    axios({
      method: 'get',
      url: "http://127.0.0.1:8000/events/",
      headers: {"authorization": localStorage.getItem('token')},
    }).then((response) => {
        console.log("Events:")
        console.log(response)
        this.setState({events: response.data})
    }).catch(function (error) {
        console.log(error)
    });
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

removeClub(id) {
  // adding a club to user profile
  // creating the new list of club ids
  var new_club_ids = []
  for (var i = 0; i < this.state.profile_club_ids.length; i++)
  {
      if (this.state.profile_club_ids[i] !== id)
          new_club_ids.push(this.state.profile_club_ids[i])
  }
  console.log(new_club_ids)
  
  axios({
      method: 'patch',
      url: this.state.userUrl,
      data: {
          club_ids: new_club_ids,
      },
      headers: {"authorization": localStorage.getItem('token')},
  }).then((response) => {
      console.log("unsubscribed from a club:")
      console.log(response)
      // updating state values accordingly
      this.setState({profile_clubs: response.data.clubs, profile_club_ids: response.data.club_ids})
  }).catch(function (error) {
      console.log(error)
  });
}

renderCards = (card, index) => {
  var len = card.date.length;
  var year = card.date.substring(0,4);
  var month = card.date.substring(5, 7);
  var day = card.date.substring(8, 10);
  var time = card.date.substring(11, len - 4);

  var months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
  if (month == months[0])
    month = "January";
  else if (month == months[1])
    month = "February";
  else if (month == months[2])
    month = "March";
  else if (month == months[3])
    month = "April";
  else if (month == months[4])
    month = "May";
  else if (month == months[5])
    month = "June"; 
  else if (month == months[6])
    month = "July";
  else if (month == months[7])
    month = "August";
  else if (month == months[8])
    month = "September";
  else if (month == months[9])
    month = "October";
  else if (month == months[10])
    month = "November";
  else if (month == months[11])
    month = "December";

  var date = month + " " + day + ", "+ year;

  if (localStorage.getItem("score") != null ) {
      this.state.curr_club = localStorage.getItem("score");
      localStorage.removeItem("score");
    }

  if (card.club == this.state.curr_club){
    return(
      <div className="date" >{date}
        <div className="event_card">
           <p className="event_title">{card.name}</p>
           <div className="event_container">
            <p className="event_info">{card.club}</p>
            <p className="event_info">{time}</p>
          </div>
        </div>
      </div>
    )
  }
  else{
    return(null)
  }
}

whenClicked(str){
  this.toggleMenu();
  this.setState({curr_club: str});
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
                {this.state.profile_clubs.map((club, index) => {
                    return(
                        <div className="club_link">
                            <a className="club_link" href = '#clubevents' onClick={() => {this.whenClicked(club.name)}}> {club.name}</a>
                            <button className="trash_button" onClick={()=>{this.removeClub(club.pk)}}><FontAwesomeIcon icon={faTrash}/></button>
                        </div>
                    )
                })}
            </div>
            <button className="button" 
                style={{bottom: '0', position: 'absolute', marginBottom: '32px'}}
                onClick={()=>{this.logOut()}}
            >Log Out</button>
          </div>

      <div className="body" style={{position: 'relative', float: 'left'}}>
          <p className="bodyHeader" style={{color: "#000000"}}>{this.state.curr_club} Events</p>
          <div className="event_wrap">{this.state.events.map(this.renderCards)} </div> 
      </div>
    </div>
    );
  }
} 