import React, { useState } from "react";
import CurrentLocation from "./currentLocation";
import "./App.css";
import logo from './images/logo.png';

function App() {
  return (
    <React.Fragment>
      <img className="logoo" src={logo} alt="Logo" />
      <div className="container">
        <CurrentLocation />
      </div>
      <div className="footer-info">
        
        | Designed & Developed by{" "}
        <a target="_blank" href="">
         Rohit UrbanGraphic
        </a>{" "}
        | 
      </div>
    </React.Fragment>
  );
}

export default App;
