import React from "react";
import Main from "./components/main";
import { HashRouter } from "react-router-dom";
//import axios from "axios";
//axios.defaults.baseURL = "http://localhost:5000";

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Main />
      </HashRouter>
    </div>
  );
}

export default App;
