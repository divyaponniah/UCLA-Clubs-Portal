import React from "react";
import "../styles/layout.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTrash, faCog } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';

export default class clubs extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            masterclubList: [],
            clubList: [],
            categories: [],
            profile_clubs: [],
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
            // set the category buttons
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
            this.setState({profile_clubs: response.data[0].clubs})
            console.log(this.state.profile_clubs)
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


  render() {
    return (
      <div className="body_nopadding" style={{position: 'relative'}}>
          <button className="menu_setting" onClick={()=>{this.toggleMenu()}}><FontAwesomeIcon icon={faCog}/></button>
          <div className="menu">
            <div className="column">
                <h1 style={{marginTop: '0px'}}>{localStorage.getItem('username')}</h1>
                <button className="menu_button" style={{marginBottom: '16px'}}>Events</button>
                <button className="menu_button">Club Info</button>
            </div>
            <div className="column">
                <h2>SUBSCRIPTIONS</h2>
                {this.state.profile_clubs.map((club, index) => {
                    return(
                        <div className="club_link">
                            <a>{club.name}</a>
                            <button className="trash_button"><FontAwesomeIcon icon={faTrash}/></button>
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
                            <button className="button">
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
