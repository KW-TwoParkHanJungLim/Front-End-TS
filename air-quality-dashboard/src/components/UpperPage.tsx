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

/*export interface Info {
  id : string;
}*/

const HomeUpper = styled.div`
  position:fixed; width:100%; height:50px; background-color:#20c997;
  padding-right:20px; z-index:1;
  top: 0;
`

const Button = styled.img`
  width:50px; height:50px; float:right;
`

const Logo = styled.img`
  width:250px; height:50px;
`

export default function UpperPage(User : any) {
  //const { UserInfo } = useQuery<Info[]>([], fetchUser); //API 통해 사용자 정보 가져오기
  const UserInfo = {
    Name: "사용자",
    ID: "ADMIN",
    PhoneNum: "01012345678",
    Email: "user@gmail.com",
  };

  const diffLogo = () => {
    if(UserInfo.ID === "ADMIN") {
      return (
        <Link to ="/admin/userlist">
          <Logo src={로고} alt="logo" onClick = {diffLogo} />
        </Link>
      );
    } else {
      return (
        <Link to ={`/${UserInfo.ID}/main`}>
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
        <Link to={`/${UserInfo.ID}/info`} state={{UserInfo: UserInfo}}>
          <Button src={회원정보} alt="user" />
        </Link>
        <Link to={`/${UserInfo.ID}/export`}>
          <Button src={엑셀} alt="excel" />
        </Link>
        <Link to={`/${UserInfo.ID}/graph`}>
          <Button src={그래프} alt="graph" />
        </Link>
      </form>
    </HomeUpper>
  );
}
