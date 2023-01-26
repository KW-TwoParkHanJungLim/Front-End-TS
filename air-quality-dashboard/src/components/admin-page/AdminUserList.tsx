import React, { useState } from 'react';
import styled from 'styled-components';
import UserSearch from './UserSearch';
import EachUser from './EachUser';
import { useQuery } from '@tanstack/react-query';
import { fetchUserList } from '../../api/api';

const UserList = styled.div`
  display: flex;
  flex-wrap : wrap;
  flex-direction: column;
  margin : 520px 150px;
  //background-color: #ecf0f1;
  border : none;
  padding : 20px 40px;
  width: 80%;
  margin: 50px; 
  margin-left: 100px;
`

const Container = styled.div`
  margin: 0 auto;
  padding-top: 100px;
  padding-left: 100px;
  height: 200vh;
  position: relative;
  width: 80%;
`

function AdminUserList() {
  const [search, setSearch] = useState("");
  const userList = useQuery<any>(["allUser"], fetchUserList);
  const onChange = (e : React.FormEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value);
  };
  const filterTitle = userList.data?.slice(0,50).filter((p : string) => {
    return p.toLocaleLowerCase().includes(search.toLocaleLowerCase());
  })
  return(
    <Container>
        <UserSearch value={search} onChange = {onChange} />
        <UserList>
        {
            filterTitle?.map((data : any, index : any) =>
            <EachUser 
                key = {index}
                user = {data}
            />
        )}
        </UserList>
        <br />
    </Container>
  );
}

export default AdminUserList;