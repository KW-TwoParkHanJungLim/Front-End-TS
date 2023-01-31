import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import UserSearch from "./UserSearch";
import EachUser from "./EachUser";
import { useQuery } from "@tanstack/react-query";
import { fetchUserList } from "../../api/api";

const UserList = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  margin: 520px 150px;
  //background-color: #ecf0f1;
  border: none;
  padding: 20px 40px;
  width: 1000px;
  margin: 50px;
  margin-left: 100px;
`;

const Container = styled.div`
  margin: 0 auto;
  padding-top: 100px;
  padding-left: 100px;
  height: 200vh;
  position: relative;
  width: 1300px;
`;

function AdminUserList() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const { data, isError } = useQuery<any>(["allUser"], fetchUserList, {
    onError: (error) => {
      if (error === 403) {
        alert("로그인 정보가 없습니다.\n로그인 화면으로 이동합니다.");
        return navigate("/");
      }
    },
  });

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value);
  };
  const filterTitle = data?.slice(0, 50).filter((p: string) => {
    return p.toLocaleLowerCase().includes(search.toLocaleLowerCase());
  });
  return (
    <Container>
      <UserSearch value={search} onChange={onChange} />
      <UserList>
        {filterTitle?.map((data: any, index: any) => (
          <EachUser key={index} user={data} />
        ))}
      </UserList>
      <br />
    </Container>
  );
}

export default AdminUserList;
