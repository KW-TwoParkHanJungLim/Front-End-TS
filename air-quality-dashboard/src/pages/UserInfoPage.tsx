import React from "react";
import styled from "styled-components";
import UpperPage from "../components/UpperPage";
import UserInfo from "../components/user-info-page/UserInfo";

const Main = styled.div`
  display:flex; justify-content: center; align-items: center; text-align:center;
  position:absolute; width:100%; height:600px; top:100px;
`

function UserInfoPage () {
  return (
    <>
      <UpperPage />
      <Main>
        <UserInfo />
      </Main>
    </>
  );  
}

export default UserInfoPage;