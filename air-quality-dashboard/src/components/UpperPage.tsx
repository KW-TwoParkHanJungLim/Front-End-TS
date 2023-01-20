import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchUser } from "../api/api_jiwoo";
import styled from "styled-components";
import { Link } from "react-router-dom";
import 로고 from "../assets/images/로고.jpg";
import 로그아웃 from "../assets/images/로그아웃.jpg";
import 회원정보 from "../assets/images/회원정보.jpg";
import 엑셀 from "../assets/images/엑셀.jpg";
import 그래프 from "../assets/images/그래프.jpg";

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
  const User : string = "axr-inducwon";
  const diffLogo = () => {
    if(User === "ADMIN") {
      return (
        <Link to ="/admin/userlist">
          <Logo src={로고} alt="logo" onClick = {diffLogo} />
        </Link>
      );
    } else {
      return (
        <Link to ={`/${User}/main`}>
          <Logo src={로고} alt="logo" onClick = {diffLogo} />
        </Link>
      );
    }
  }

  //로그아웃 기능 연결되면 Link 지우기
  return (
    <HomeUpper>
      <form action='/logout' method='post'>
        {diffLogo()}
        <Link to="/">
          <Button src={로그아웃} alt="logout" />
        </Link>
        <Link to={`/${User}/info`} state={{UserId: User}}>
          <Button src={회원정보} alt="user" />
        </Link>
        <Link to={`/${User}/export`}>
          <Button src={엑셀} alt="excel" />
        </Link>
        <Link to={`/${User}/graph`}>
          <Button src={그래프} alt="graph" />
        </Link>
      </form>
    </HomeUpper>
  );
}
