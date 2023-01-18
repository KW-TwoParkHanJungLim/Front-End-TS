import { useQuery } from "@tanstack/react-query";
import React, {useState, useEffect} from "react";
import axios from "axios";
import styled from 'styled-components';
import { Link } from "react-router-dom";
import LoginLogo from "../assets/images/로그인 로고.jpg";
import { onLogin } from "../JWT/auth";

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

export default function LoginPage (props : any) {
  const JWT_EXPIRY_TIME = 24*3600*1000; //만료시간 (24시간 millisec로 표현)
  const [Info, setInfo] = useState({
      ID: "", PW: ""
    })
    const {ID, PW} = Info;
    const handleChange = (e : any) => {
      const { value, name } = e.target;
        setInfo({
            ...Info,
            [name]: value
        });
    }

    //form의 action 이용해서 login 작업 control
    //관리자 로그인 시 /admin/userlist로 이동, 일반사용자 로그인 시 /user/main으로 이동
    //로그인 기능 연결되면 Link 지우기
    return (
      <Container>
        <Login>
          <Loginlogo src={LoginLogo} alt="LoginLogo" />
          <LoginInfo type="text" name="ID" value={ID} placeholder="ID" onChange={handleChange} />
          <LoginInfo type="password" name="PW" value={PW} placeholder="Password" onChange={handleChange} />
          <p /><br />
          <Link to="/axr-inducwon/main">
            <LoginButton onClick={onLogin}>로그인</LoginButton>
          </Link>
        </Login>
      </Container>
    );
}
