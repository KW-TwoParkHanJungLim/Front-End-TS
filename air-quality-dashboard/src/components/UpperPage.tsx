import React from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { setCookie, getCookie, removeCookie } from "../JWT/cookie";
import styled from "styled-components";
import { Link } from "react-router-dom";
import 로고 from "../assets/images/로고.jpg";
import 로그아웃 from "../assets/images/로그아웃.jpg";
import 회원정보 from "../assets/images/회원정보.jpg";
import 엑셀 from "../assets/images/엑셀.jpg";
import 그래프 from "../assets/images/그래프.jpg";
import 홈 from "../assets/images/홈.jpg";
import { useRecoilCallback } from "recoil";

const HomeUpper = styled.div`
  position:fixed; width:100%; height:70px; background-color:#20c997;
  padding-right:20px; z-index:1;
  top: 0;
`

const Button = styled.img`
  width:70px; height:70px; float:right;
`

const Logo = styled.img`
  width:300px; height:70px;
`

type IdProps = {
  Id: string
} 

export interface UserInterface {
  name: string,
  id: string,
  phone: string,
  email: string
}


export default function UpperPage(){
  const navigate = useNavigate();
  const ID : string = getCookie('id');
  const Role : string = getCookie('role');
  const User : string = getCookie('user');
  //const User : string = "admin";

  const diffLogo = () => {
    if(Role === "admin") {
      return (
        <Link to ={`/${ID}/userlist`} onClick={
          () => {
            setCookie('user', ID);
          }
        }>
          <Logo src={로고} alt="logo" />
        </Link>
      );
    }
    else {
      return (
        <Link to ={`/${ID}/main`}>
          <Logo src={로고} alt="logo" />
        </Link>
      );
    }
  }
  const logOut = () => {
    if(window.confirm("로그아웃 하시겠습니까?")) {
      removeCookie('id'); // 쿠키를 삭제
      removeCookie('role');
      removeCookie('user'); 
      removeCookie('token');
      alert("로그아웃 되었습니다.")
		  navigate('/'); // 메인 페이지로 이동
    } else {
      //동작 x
    }
	};
  const diffInfo = () => {
    var link : string;
    if(Role === "admin") {
      if(User === ID) link = `/${User}/info`;
      else link = `/${ID}/${User}/info`;
    }
    else link = `/${ID}/info`;
    return (
      <Link to={link}>
        <Button src={회원정보} alt="user" />
      </Link>
    ); 
  }
  const diffExport = () => {
    var link : string;
    if(Role === "admin") {
      if(User === ID) return;
      else link = `/${ID}/${User}/export`;
    }
    else link = `/${ID}/export`;
    return (
      <Link to={link} >
        <Button src={엑셀} alt="export" />
      </Link>
    );
  }
  const diffGraph = () => {
    var link : string;
    if(Role === "admin") {
      if(User === ID) return;
      else link = `/${ID}/${User}/graph`;
    }
    else link = `/${ID}/graph`;
    return (
      <Link to={link} >
        <Button src={그래프} alt="export" />
      </Link>
    );
  }
  const diffHome = () => {
    var link : string;
    if(Role === "admin") {
      if(User === ID) return;
      else link = `/${ID}/${User}/main`;
    }
    else return;
    return (
      <Link to={link} >
        <Button src={홈} alt="home" />
      </Link>
    )
  }

  //로그아웃 기능 연결되면 Link 지우기
  return (
    <HomeUpper>
      <form action='/logout' method='post'>
        {diffLogo()}
        <Button src={로그아웃} alt="logout" onClick={logOut} />
        {diffInfo()}
        {diffExport()}
        {diffGraph()}
        {diffHome()}
      </form>
    </HomeUpper>
  );
}
