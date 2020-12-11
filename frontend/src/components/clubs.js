import React from "react";
import "../styles/layout.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTrash, faCog } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';

export default class clubs extends React.Component {
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
            this.setState({pk: response.data[0].pk})
            console.log(this.state.pk)
            this.setState({user: response.data[0].user})
            console.log(this.state.user)
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
            setting.style.backgroundColor = "#0033b6";
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

    selectCategory(c) {
        const button = document.getElementById(c);
        if( button.style.backgroundColor == 'rgb(238, 220, 121)') {
            this.setState({clubList: this.state.masterclubList});
            button.style.backgroundColor = '#1488e0';
        }
        else {
            this.setState({clubList: ""});
            var newList = [];
            this.state.masterclubList.map((club, index) => {
                if(club.category == c) {
                    newList.push(club);
                }
            });
            this.setState({clubList: newList});
            this.state.categories.map((c)=>{
                document.getElementById(c).style.backgroundColor = '#1488e0';
            });
            button.style.backgroundColor = '#eedc79';
        }
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
            method: 'put',
            url: this.state.userUrl,
            data: {
                club_ids: [...new_club_ids],
                clubs: this.state.profile_clubs,
                pk: this.state.pk,
                url: this.state.userUrl,
                user: this.state.user,
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
            method: 'put',
            url: this.state.userUrl,
            data: {
                club_ids: new_club_ids,
                clubs: this.state.profile_clubs,
                pk: this.state.pk,
                url: this.state.userUrl,
                user: this.state.user,
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
                            <a href = '#xy'> {club.name}</a>
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

          <div className="searchbar">
            <div class="search-container">
                <form className="search">
                <input type="text" placeholder="Search.." name="search"/>
                <button className="search_button" >
                    <FontAwesomeIcon icon={faSearch} style={{color: 'black'}}/>
                </button>
                </form>
            </div>
            <div className="button_container">
                { this.state.categories.map((category)=> {
                    return(
                        <button className="category_button" 
                            id={category} onClick={()=>{this.selectCategory(category)}}>
                            {category}
                        </button>
                    )
                })}
            </div>
          </div>
          <div className="club_list">
                {this.state.clubList.map((club, index) => {
                    return(
                        <div className="club_card">
                            <div className="club_words">
                                <h3 className="club_name">{club.name}</h3>
                                <p className="club_description">{club.description}</p>
                            </div>
                            <button className="button" onClick={()=>{this.addClub(club.pk)}}>
                                Subscribe
                            </button>
                        </div>
                    )
                })}
          </div>
      </div>
    );
  }
}
