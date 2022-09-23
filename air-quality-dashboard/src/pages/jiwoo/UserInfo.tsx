import React, { Component } from 'react';
import UpperPage from '../../components/jiwoo/UpperPage';

export default class UserInfo extends Component {
    render() {
      return (
        <div className="UserInfo">
          <UpperPage></UpperPage>
          <div id="UserInfo_SideBanner">
            <h3>목록</h3><hr></hr>
            <h4>내 프로필</h4><p />
          </div>
          <div id="UserInfo_Main" >
            <h1>내 프로필</h1><p /><br />
            <h3 id="UserInfo">이름 &nbsp;&nbsp;&nbsp;<input type='text' className="InfoText"></input><p /><br /></h3>
            <h3 id="UserInfo">아이디 <input type='text' className="InfoText"></input><p /><br /></h3>
            <h3 id="UserInfo">연락처 <input type='text' className="InfoText"></input><p /><br /></h3>
            <h3 id="UserInfo">이메일 <input type='text' className="InfoText"></input></h3>  
          </div>
        </div>
      );
    }
}