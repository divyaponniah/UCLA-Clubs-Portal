import React from "react";
import "../styles/layout.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTrash, faCog } from "@fortawesome/free-solid-svg-icons";

export default class clubs extends React.Component {
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

  render() {
    return (
      <div className="body_nopadding" style={{position: 'relative'}}>
          <button className="menu_setting" onClick={()=>{this.toggleMenu()}}><FontAwesomeIcon icon={faCog}/></button>
          <div className="menu">
            <div className="column">
                <h1 style={{marginTop: '0px'}}>Name</h1>
                <button className="menu_button" style={{marginBottom: '16px'}}>Events</button>
                <button className="menu_button">Club Info</button>
            </div>
            <div className="column">
                <h2>SUBSCRIPTIONS</h2>
                <div className="club_link">
                    <a>ACM</a>
                    <button className="trash_button"><FontAwesomeIcon icon={faTrash}/></button>
                </div>
                <div className="club_link">
                    <a>SWE</a>
                    <button className="trash_button"><FontAwesomeIcon icon={faTrash}/></button>
                </div>
                <div className="club_link">
                    <a>Bruin Racing</a>
                    <button className="trash_button"><FontAwesomeIcon icon={faTrash}/></button>
                </div>
            </div>
            <a className="link" href="#login" style={{bottom: '0', position: 'absolute', marginBottom: '32px'}}>Log Out</a>
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
                <button className="button" style={{backgroundColor: '#1488e0', width: 'auto'}}>Sports</button>
            </div>
          </div>
          <div className="club_list">
            <div className="club_card">
                <div className="club_words">
                    <h3 className="club_name">
                        Archery
                    </h3>
                    <p className="club_description">
                        description
                    </p>
                </div>
                <button className="button">
                    Subscribe
                </button>
            </div>

            <div className="club_card">
                <div className="club_words">
                    <h3 className="club_name">
                        Badminton
                    </h3>
                    <p className="club_description">
                        description
                    </p>
                </div>
                <button className="button">
                    Subscribe
                </button>
            </div>

            <div className="club_card">
                <div className="club_words">
                    <h3 className="club_name">
                        Baseball
                    </h3>
                    <p className="club_description">
                        description
                    </p>
                </div>
                <button className="button">
                    Subscribe
                </button>
            </div>

            <div className="club_card">
                <div className="club_words">
                    <h3 className="club_name">
                        Basketball
                    </h3>
                    <p className="club_description">
                        description
                    </p>
                </div>
                <button className="button">
                    Subscribe
                </button>
            </div>
          </div>
      </div>
    );
  }
}
