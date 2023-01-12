import React, { Component } from "react";
import styled from 'styled-components';
import { Link } from "react-router-dom";
import LoginLogo from "../assets/images/로그인 로고.jpg";
import "../styles/Div.css";

const Container = styled.div`
  display:flex; justify-content:center;
`

const Login = styled.div`
  position:absolute; top:25%; width:650px; height:45%; text-align:center;
  padding:10px; border:4px solid gray; border-radius:4px;
`

const Loginlogo = styled.img`
  position:relative; top:20px;
  width:70%; height:40%; margin-bottom:20px;
`

const LoginInfo = styled.input`
  width:70%; height:40px; font-size:20px; margin-top:10px;
  border:2px solid black; border-radius:5px;
`

const LoginButton = styled.button`
  width:100px; height:40px; font-size:20px; background-color:#20c997;
  border:0; border-radius:5px; margin-top:20px; color:white; 
`

export default class LoginPage extends Component {
  render() {
    //form의 action 이용해서 login 작업 control
    //관리자 로그인 시 /admin/userlist로 이동, 일반사용자 로그인 시 /user/main으로 이동
    //로그인 기능 연결되면 Link 지우기
    return (
      <Container>
        <Login>
          <form action="/loginProcess" method="post"> 
            <Loginlogo src={LoginLogo} alt="LoginLogo" />
            <LoginInfo type="text" placeholder="ID" />
            <LoginInfo type="password" placeholder="Password" />
            <p /><br />
            <Link to="/user/main">
              <LoginButton>로그인</LoginButton>
            </Link>
          </form>
        </Login>
      </Container>
    );
  }
}
