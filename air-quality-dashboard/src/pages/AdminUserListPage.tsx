import React from "react";
import UpperPage from "../components/UpperPage";
import AdminUserList from "../components/admin-page/AdminUserList";

function AdminUserListPage () {
  return (
    <>
      <div className="MainPage">
        <UpperPage />
      </div>
      <AdminUserList />
    </>
  );
}

export default AdminUserListPage;