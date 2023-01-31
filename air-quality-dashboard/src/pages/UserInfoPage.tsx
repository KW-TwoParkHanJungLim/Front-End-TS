import React from "react";
import styled from "styled-components";
import UpperPage from "../components/UpperPage";
import UserInfo from "../components/user-info-page/UserInfo";

function UserInfoPage () {
  return (
    <>
      <UpperPage />
      <UserInfo />
    </>
  );  
}

export default UserInfoPage;