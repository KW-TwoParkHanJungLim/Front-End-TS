import React, { Component } from "react";
import { Link } from "react-router-dom";
import LoginLogo from "../assets/images/로그인 로고.jpg";
import "../styles/Div.css";

export default class LoginPage extends Component {
  render() {
    return (
      <div className="LoginPage">
        <div id="Login">
          <img src={LoginLogo} id="LoginLogo" alt="LoginLogo"></img>
          <input type="text" placeholder="ID" id="UserID"></input>
          <input type="password" placeholder="Password" id="UserPW"></input>
          <p />
          <Link to="/user/main">
            <button id="loginbutton">로그인</button>
          </Link>
        </div>
      </div>
    );
  }
}
