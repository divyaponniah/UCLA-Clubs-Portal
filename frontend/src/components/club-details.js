import React from "react";
import "../styles/layout.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faCog } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import {Card} from "react-bootstrap";
import events from "./events";

export default class ClubDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      userId:[], // user's id
      userUrl: '', // user's url
      profile_clubs: [], // the user's subscribed clubs
      profile_club_ids: [], // the user's subscribed club's id,
      club: [], // club the page is about
      events: [],
      comments: [], // club comments
    };
  }

  updateComments(){
    // retrieve club comments
    axios({
      method: 'get',
      url: "http://127.0.0.1:8000/comments/?club=" + localStorage.getItem('club_id'),
      headers: {"authorization": localStorage.getItem('token')},
    }).then((response) => {
        console.log("club comments:")
        this.setState({comments: response.data})
        console.log(response)
    }).catch(function (error) {
        console.log(error)
    });
  }
  
  componentDidMount() {
    console.log(localStorage.getItem('club_id'))
    // all club data
    axios({
      method: 'get',
      url: "http://127.0.0.1:8000/clubs/",
      headers: {"authorization": localStorage.getItem('token')},
    }).then((response) => {
        console.log("all club data:")
        console.log(response)
        // setting specific club data
        response.data.map((c, index) =>
        {
          if(c.pk == localStorage.getItem('club_id'))
          {
            this.setState({
              club: c,
              events: c.events,})
          }
        })
        console.log(this.state.club)
        console.log(this.state.events)
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
        this.setState({userId: response.data[0].user.pk})
        console.log(this.state.userId)
        this.setState({userUrl: response.data[0].url})
        console.log(this.state.userUrl)
        this.setState({profile_clubs: response.data[0].clubs})
        console.log(this.state.profile_clubs)
        this.setState({profile_club_ids: response.data[0].club_ids})
        console.log(this.state.profile_club_ids)
    }).catch(function (error) {
        console.log(error)
    });
    this.updateComments()
  }

  logOut() {
    // log out; reset the token and usernamed cached and return to login page
    localStorage.setItem("token", "");
    localStorage.setItem("username", "");
    window.location.href= "#login";
  }

  toggleMenu() {
    var setting = document.getElementsByClassName("menu_setting")[0];
    var menu = document.getElementsByClassName("menu")[0];
    if (menu.style.display == "flex")
    {
        menu.style.display = "none";
        setting.style.backgroundColor = "#0033b6";
    }
    else
    {
        menu.style.display = "flex";
        setting.style.backgroundColor = "#1488e0";
    }
  }

  addComment() {
    var t = document.getElementById('comment_title');
    var d = document.getElementById('comment_description');
    console.log(t)
    console.log(d)
    // adding a comment
    axios({
        method: 'post',
        url: "http://127.0.0.1:8000/comments/",
        headers: {"authorization": localStorage.getItem('token')},
        data: {
          profile_id: this.state.userId,
          club_id: this.state.club.pk,
          title: t.value,
          description: d.value,
        },
    }).then((response) => {
        console.log("added a comment")
        console.log(response)
        this.state.comments.push(response.data)
        t.value = "";
        d.value = "";
    }).catch(function (error) {
        console.log(error)
    });
  }

  renderCard = (card, index) => {
    var strlen = card.date.length;
    var temp_year = card.date.substring(0, 4);
    var temp_month = card.date.substring(5, 7);
    var temp_day = card.date.substring(8, 10);
    var temp_time = card.date.substring(11, strlen-4);
    var temp_date = temp_month + "-" + temp_day + "-" + temp_year

    return(
        <Card
          border='primary'
          key={index}
          style={{ width: '22rem' }}
          className="text-center"
        >
        <Card.Body>
          <Card.Header as="h3">{card.name}</Card.Header>
          <Card.Title>
            {"Date: " + temp_date}
          </Card.Title>
          <Card.Subtitle>
            {"Time: " + temp_time}
          </Card.Subtitle>
        </Card.Body>
      </Card>
    )
  }
  addClub(id) {
    // adding a club to user profile
    // creating the new club id list 
    // (using a set that then converts to an array as to not add the same id)
    var new_club_ids = new Set([...this.state.profile_club_ids])
    const club_id_size = new_club_ids.size
    new_club_ids.add(id)
    console.log([...new_club_ids])
    console.log(club_id_size)
    console.log(new_club_ids.size)
    
    axios({
        method: 'patch',
        url: this.state.userUrl,
        data: {
            club_ids: [...new_club_ids],
        },
        headers: {"authorization": localStorage.getItem('token')},
    }).then((response) => {
        console.log("subscribed to a club:")
        console.log(response)
        // updating state values accordingly
        if (club_id_size !== new_club_ids.size) {
            this.setState({profile_clubs: response.data.clubs, profile_club_ids: response.data.club_ids})
        }
    }).catch(function (error) {
        console.log(error)
    });
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
  
  whenClicked(str){
    this.toggleMenu();
    this.setState({curr_club: str});
    localStorage.setItem("score", str);
  }

  render() {
    return (
    <div className="body_nopadding" style={{position: 'relative'}}>
      <button className="menu_setting" onClick={()=>{this.toggleMenu()}}><FontAwesomeIcon icon={faCog}/></button>
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
                        <a className="club_link" href = '#clubevents' onClick={() => {this.whenClicked(club.name)}}>{club.name}</a>
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

      <div className="headerBody" style={{padding: '32px'}}>
        <h1 className="bodyHeader">{this.state.club.name}</h1>
        <div className="button_container">
          <button className="search_button"  
            style={{float: 'right', marginLeft: 'auto', color: 'black'}}
            onClick={()=>{this.addClub(localStorage.getItem('club_id'))}}>
              Subscribe
          </button>
        </div>
      </div>
          
      <div className="body">
        <div className="club_details">
          <h2>Description</h2>
          <p>{this.state.club.description}</p>
          <h2>Socials</h2>
          <p>{this.state.club.socials}</p>
          
          <h2>Upcoming Events</h2>
          <div className="card_events">
            {this.state.events.map(this.renderCard)}
          </div>
         
          <h2></h2>
          
          <h2>Comments</h2>
          {this.state.comments.map((comment, index)=> {
            return(
                <div className="comment">
                  <p style={{borderBottom: 'white solid 2px'}}>{comment.title}</p>
                  <div className="divider" />
                  <p>{comment.description}</p>
                </div>
            )})}
        </div>

        <form className="comment_form">
          <h1 style={{textDecoration: 'underline'}}>Add A Comment</h1>
          
          <label>Title</label>
          <input type='text' id="comment_title" />

          <label>Description</label>
          <textarea type='text' id="comment_description" />
          <button className="comment_button" onClick={()=>{this.addComment()}}>Add Comment</button>
        </form>

      </div>
      </div>
    );
  } 
} 