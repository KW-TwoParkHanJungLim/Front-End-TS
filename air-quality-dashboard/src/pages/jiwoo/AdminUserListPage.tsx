import React, { Component } from 'react';
import UpperPage from '../../components/jiwoo/UpperPage';
import AdminUserList from '../../components/jiwoo/AdminUserList';

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