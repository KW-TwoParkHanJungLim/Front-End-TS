import React, { Component } from "react";
import styled from "styled-components";
import UpperPage from "../components/UpperPage";
import UserInfo from "../components/user-info-page/UserInfo";

export default class UserInfoPage extends Component {
  render() {
    return (
      <div className="UserInfo">
        <UpperPage></UpperPage>
        <div id="UserInfo_Main">
          <UserInfo />
        </div>
      </div>
    );
  }
}
