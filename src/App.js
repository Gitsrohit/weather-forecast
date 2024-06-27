import React, { useState } from "react";
import CurrentLocation from "./currentLocation";
import "./App.css";

function App() {
  return (
    <React.Fragment>
      <div className="container">
        <CurrentLocation />
      </div>
      <div className="footer-info">
        
        | Designed & Developed by{" "}
        <a target="_blank" href="https://www.gauravghai.dev/">
         Rohit UrbanGraphic
        </a>{" "}
        | 
      </div>
    </React.Fragment>
  );
}

export default App;
