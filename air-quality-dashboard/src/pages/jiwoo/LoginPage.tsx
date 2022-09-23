import React, { Component } from 'react';
import styled from "styled-components/macro";
import GlobalStyle from "../../styles/GlobalStyle";
import LoginLogo from '../../images/로그인 로고.jpg';
import '../../styles/Div.css';

export default class LoginPage extends Component {
    render() {
      return (
        <div className="LoginPage">
          <div id="Login">
            <img src= {LoginLogo} id="LoginLogo" alt="LoginLogo"></img>
            <p />
            <input type="text" placeholder="ID" id="UserID"></input>
            <p />
            <input type="password" placeholder="Password" id="UserPW"></input>
            <p />
            <a href="user/main"><button id="loginbutton">로그인</button></a>
          </div>
        </div>
      );
    }
}