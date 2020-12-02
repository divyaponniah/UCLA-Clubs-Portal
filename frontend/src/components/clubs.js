import React from "react";
import "../styles/layout.css";

export default class clubs extends React.Component {
  render() {
    return (
      <div className="body_nopadding">
          <div className="searchbar">search bar</div>
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
                <button className="subscribe_button">
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
                <button className="subscribe_button">
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
                <button className="subscribe_button">
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
                <button className="subscribe_button">
                    Subscribe
                </button>
            </div>
          </div>
      </div>
    );
  }
}
