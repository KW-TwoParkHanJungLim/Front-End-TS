import React, { Component } from "react";
import UpperPage from "../components/UpperPage";
import AdminUserList from "../components/admin-page/AdminUserList";

export default class AdminUserListPage extends Component {
  render() {
    return (
      <>
        <div className="MainPage">
          <UpperPage></UpperPage>
        </div>
        <AdminUserList />
      </>
    );
  }
}
