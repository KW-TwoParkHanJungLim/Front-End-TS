import React, { useRef } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { setCookie } from "../JWT/cookie";
import LoginLogo from "../assets/images/로그인 로고.jpg";

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const Login = styled.div`
  position: absolute;
  top: 25%;
  width: 650px;
  height: 400px;
  text-align: center;
  padding: 10px;
  border: 4px solid gray;
  border-radius: 4px;
`;

const Loginlogo = styled.img`
  position: relative;
  top: 20px;
  width: 70%;
  height: 40%;
  margin-bottom: 20px;
`;

const LoginInfo = styled.input`
  width: 70%;
  height: 40px;
  font-size: 20px;
  margin-top: 10px;
  border: 2px solid black;
  border-radius: 5px;
`;

const LoginButton = styled.button`
  width: 100px;
  height: 40px;
  font-size: 20px;
  background-color: #20c997;
  border: 0;
  border-radius: 5px;
  margin-top: 20px;
  color: white;
`;

function LoginPage() {
  const formRef: any = useRef();
  const navigate: any = useNavigate();

  const login = (e: any) => {
    e.preventDefault();
    axios
      .post("http://backend.hanseojin.shop:8088/login", {
        id: formRef.current.ID.value,
        password: formRef.current.PW.value,
      })
      .then((res) => {
        alert("로그인 되었습니다.");
        const value: any = {
          token: res.data.token,
          id: formRef.current.ID.value,
          role: res.data.role,
        };
        setCookie("token", value.token);
        setCookie("id", value.id);
        setCookie("role", value.role);
        setCookie("user", value.id);
        if (value.role === "admin") navigate(`/${value.id}/userlist`);
        else navigate(`/${value.id}/main`);
      })
      .catch(() => {
        alert("존재하지 않는 아이디 또는 비밀번호 입니다.");
      });
  };

  return (
    <Container>
      <Login>
        <form ref={formRef} onSubmit={login}>
          <Loginlogo src={LoginLogo} alt="LoginLogo" />
          <LoginInfo type="text" name="ID" id="ID" placeholder="ID" required />
          <LoginInfo
            type="password"
            name="PW"
            id="PW"
            placeholder="Password"
            required
          />
          <p />
          <br />
          <LoginButton type="submit">로그인</LoginButton>
        </form>
      </Login>
    </Container>
  );
}

export default LoginPage;
