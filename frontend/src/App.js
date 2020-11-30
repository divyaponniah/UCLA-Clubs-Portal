import React from "react";
import Main from "./components/main";
import Footer from "./components/footer";
import Header from "./components/header";
import { HashRouter } from "react-router-dom";
//import axios from "axios";
//axios.defaults.baseURL = "http://localhost:5000";

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Header />
        <Main />
        <Footer />
      </HashRouter>
    </div>
  );
}

export default App;
