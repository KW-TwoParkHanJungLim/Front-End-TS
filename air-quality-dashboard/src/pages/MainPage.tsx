import React, { Component } from "react";
import UpperPage from "../components/UpperPage";
import MainPageList from "../components/main-page/MainPageList";

export default function MainPage () {
  //API 통해 UserID 얻기
  return (
    <>
      <UpperPage />
      <MainPageList />
    </>
  );
}
