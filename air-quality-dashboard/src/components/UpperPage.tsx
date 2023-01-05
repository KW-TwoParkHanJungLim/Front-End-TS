import React from "react";
import styled from "styled-components";
import "../styles/Div.css";
import { Link } from "react-router-dom";
import 로고 from "../assets/images/로고.jpg";
import 로그아웃 from "../assets/images/로그아웃.jpg";
import 회원정보 from "../assets/images/회원정보.jpg";
import 엑셀 from "../assets/images/엑셀.jpg";
import 그래프 from "../assets/images/그래프.jpg";

const List = styled.div`
  position: absolute;
  top: 15px;
  left: 25%;
  width: 50%;
  display: flex;
  justify-content: center;
  color: white;
  font-size: 20px;
`;

const UserInfo = {
  User: "ADMIN", //사용자가 누구냐에 따라 바뀔 수 있게 추후에 수정
  Name: "사용자",
  ID: "USER",
  PhoneNum: "01012345678",
  Email: "user@gmail.com",
};

export default function UpperPage() {
  const diffLayer = () => {
    if (UserInfo.User === "ADMIN") {
      return (
        <div>
          <List>
            <Link to="/admin/userlist">사용자 리스트</Link>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Link to="/admin/main">센서 리스트</Link>
          </List>
          <Link to="/user/main">
            <img src={로고} id="로고" alt="logo"></img>
          </Link>
          <Link to="/">
            <img src={로그아웃} id="우측상단" alt="logout"></img>
          </Link>
          <Link
            to="/user/info"
            state={{
              Name: UserInfo.Name,
              ID: UserInfo.ID,
              PhoneNum: UserInfo.PhoneNum,
              Email: UserInfo.Email,
            }}
          >
            <img src={회원정보} id="우측상단" alt="user"></img>
          </Link>
          <Link to="/user/export">
            <img src={엑셀} id="우측상단" alt="excel"></img>
          </Link>
          <Link to="/user/graph">
            <img src={그래프} id="우측상단" alt="graph"></img>
          </Link>
        </div>
      );
    } else {
      return (
        <div>
          <Link to="/user/main">
            <img src={로고} id="로고" alt="logo"></img>
          </Link>
          <Link to="/">
            <img src={로그아웃} id="우측상단" alt="logout"></img>
          </Link>
          <Link
            to="/user/info"
            state={{
              Name: UserInfo.Name,
              ID: UserInfo.ID,
              PhoneNum: UserInfo.PhoneNum,
              Email: UserInfo.Email,
            }}
          >
            <img src={회원정보} id="우측상단" alt="user"></img>
          </Link>
          <Link to="/user/export">
            <img src={엑셀} id="우측상단" alt="excel"></img>
          </Link>
          <Link to="/user/graph">
            <img src={그래프} id="우측상단" alt="graph"></img>
          </Link>
        </div>
      );
    }
  };

  return <div className="HomeUpper">{diffLayer()}</div>;
}
