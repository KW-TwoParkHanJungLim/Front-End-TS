import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { fetchUser } from "../../api/api";
import { useQuery } from "@tanstack/react-query";
import { getCookie } from "../../JWT/cookie";

const Main = styled.div`
  display:flex; justify-content: center; align-items: center; text-align:center;
  position:absolute; width:100%; height:600px; top:100px;
`

const Header = styled.h1`
  margin-bottom: 50px;
  font-weight: 700;
  font-size: 46px;
  color: #2c3e50;
  position: relative;
  z-index: 1;
  position: absolute;
  top: 50px;
`;

const Container = styled.div`
  position: absolute;
  top: 160px;
`;
const H3 = styled.h3`
  padding-bottom: 30px;
  font-size: 24px;
  font-weight: 600;
`;

const InfoText = styled.input`
  width: 400px;
  height: 50px;
  font-size: 20px;
  background-size: 40px;
  padding: 5px 20px 5px 10px;
  border: 0px;
  border-bottom: 2px solid gray;
  margin-left: 5em;
`;

const Back = styled.button`
  position: absolute;
  top: 600px;
  width: 120px;
  height: 40px;
  font-size: 20px;
  border: 0;
  border-radius: 5px;
  color: white;
  background-color: #20c997;
  box-shadow: 2px 2px lightgray;
`;

function UserInfo() {
  const navigate = useNavigate();
  const UserId: any = getCookie("user"); //상단 바의 사용자 버튼 클릭 시 넘어오는 사용자 정보
  const { data, isError } = useQuery<any>([UserId], () => fetchUser(UserId), {
    onError: (error) => {
      if (error === 403) {
        alert("로그인 정보가 없습니다.\n로그인 화면으로 이동합니다.");
        return navigate("/");
      }
    },
  });

  const Goback = () => {
    window.history.back();
  };

  return (
    <Main>
      <Header>내 프로필</Header>
      <p />
      <br />
      <Container>
        <H3>
          이름 &nbsp;&nbsp;&nbsp;
          <InfoText type="text" name="Name" value={data?.name} disabled />
          <p />
          <br />
        </H3>
        <H3>
          아이디 <InfoText type="text" name="ID" value={data?.id} disabled />
          <p />
          <br />
        </H3>
        <H3>
          연락처{" "}
          <InfoText type="text" name="PhoneNum" value={data?.phone} disabled />
          <p />
          <br />
        </H3>
        <H3>
          이메일{" "}
          <InfoText type="text" name="Email" value={data?.email} disabled />
          <p />
          <br />
        </H3>
      </Container>
      <Back onClick={Goback}>뒤로가기</Back>
    </Main>
  );
}

export default UserInfo;
