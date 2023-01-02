import React, { Component } from "react";
import UpperPage from "../components/UpperPage";
import MainPageList from "../components/main-page/MainPageList";

export default class MainPage extends Component {
  render() {
    return (
      <>
        <div className="MainPage">
          <UpperPage></UpperPage>
        </div>
        <MainPageList></MainPageList>
      </>
    );
  }
}
