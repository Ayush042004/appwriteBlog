import React from "react";
import logo from "../assets/logo.png"
// here we are gonna add our logo which we are gonna use later anywhere 
function Logo({width = '100px'}) {
    return (
        <img src={logo} alt="logo" style={{width}}/>
    );
}

export default Logo;
