import React, { useState, useEffect } from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import { fetchUser } from '../../api/api_jiwoo';
import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';

const Header = styled.h1`
  margin-bottom: 50px;
  font-weight: 700;
  font-size : 46px;
  color: #2c3e50;
  position : relative;
  span{
    z-index : 1;
    font-size : 35px;
    position : absolute;
    left : 20px;
    top : 110px;
    opacity : 0.5;
  }
`;

const H3 = styled.h3`
    padding-bottom:30px; font-size:20px;
`

const InfoText = styled.input`
    width:400px; height:50px; font-size:20px; background-size:40px;
    padding: 5px 20px 5px 10px; border:0px; border-bottom:2px solid gray; margin-left:5em;
`

const Back = styled.button`
    position: absolute; left: 880px; top: 600px; width:120px; height:40px; font-size:20px;    
    border:0; border-radius:5px; color: white; background-color:#20c997; box-shadow:2px 2px lightgray;
`

function UserInfo() {
    const location = useLocation();
    const UserId = location.state.UserId; //상단 바의 사용자 버튼 클릭 시 넘어오는 사용자 정보
    const UserInfo = useQuery<any>([UserId], () => fetchUser(UserId));
    const Goback = () => {
        window.history.back();
    }
    
    return(
        <div>
            <Header>내 프로필</Header>
            <H3>이름 &nbsp;&nbsp;&nbsp;<InfoText type='text' name="Name" value={UserInfo.data.name} disabled /><p /><br /></H3>
            <H3>아이디 <InfoText type='text' name="ID" value={UserInfo.data.id} disabled /><p /><br /></H3>
            <H3>연락처 <InfoText type='text' name="PhoneNum" value={UserInfo.data.phone} disabled /><p /><br /></H3>
            <H3>이메일 <InfoText type='text' name="Email" value={UserInfo.data.email} disabled /><p /><br /></H3>
            <Back onClick={Goback}>뒤로가기</Back>
        </div>
    );
}

export default UserInfo;