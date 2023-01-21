import React from 'react';
import { fetchUser } from '../../api/api_jiwoo';
import { useQuery } from '@tanstack/react-query';
import { getCookie } from '../../JWT/cookie';
import styled from 'styled-components';

const Header = styled.h1`
  margin-bottom: 50px;
  font-weight: 700;
  font-size : 46px;
  color: #2c3e50;
  position : relative;
  z-index : 1;
  position : absolute;
  left : 670px;
  top: 50px;
`;

const Container = styled.div`
    position:absolute; left:670px; top:160px;
`
const H3 = styled.h3`
    padding-bottom:30px; font-size:24px; font-weight:600;
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
    const UserId : any = getCookie('user'); //상단 바의 사용자 버튼 클릭 시 넘어오는 사용자 정보
    const userInfo = useQuery<any>([UserId], () => fetchUser(UserId));
    const Goback = () => {
        window.history.back();
    }
    
    return(
        <div>
            <Header>내 프로필</Header><p /><br />
            <Container>
                <H3>이름 &nbsp;&nbsp;&nbsp;<InfoText type='text' name="Name" value={userInfo.data.name} disabled /><p /><br /></H3>
                <H3>아이디 <InfoText type='text' name="ID" value={userInfo.data.id} disabled /><p /><br /></H3>
                <H3>연락처 <InfoText type='text' name="PhoneNum" value={userInfo.data.phone} disabled /><p /><br /></H3>
                <H3>이메일 <InfoText type='text' name="Email" value={userInfo.data.email} disabled /><p /><br /></H3>
            </Container>
            <Back onClick={Goback}>뒤로가기</Back>
        </div>
    );
}

export default UserInfo;