import React, { useState } from 'react';
import styled from 'styled-components';
import UserSearch from '../../components/jiwoo/UserSearch';
import EachUser from './EachUser';
import { useQuery } from '@tanstack/react-query';
import { fetchCoins } from '../../api/api';

const Header = styled.h1`
  margin-top: 50px;
  margin-bottom:50px;
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
`

const UserList = styled.div`
  display: flex;
  flex-wrap : wrap;
  flex-direction: column;
  margin : 520px 150px;
  background-color: #ecf0f1;
  border : none;
  padding : 20px 40px;
  width: 80%;
  margin: 50px; 
  margin-left: 100px;
`

const Container = styled.div`
  margin: 0 auto;
  padding-top: 70px;
  padding-left: 100px;
  height: 200vh;
  position: relative;
  width: 80%;
`;

export interface CoinInterface{
  id: string,
  name: string,
  symbol: string,
  rank: number,
  is_new: boolean,
  is_active: boolean,
  type: string,
}

function AdminUserList(){
  const [search, setSearch] = useState("");
  const {data} = useQuery<CoinInterface[]>(["allCoins"], fetchCoins);
  const onChange = (e : React.FormEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value);
  };
  const filterTitle = data?.slice(0,50).filter((p) => {
    return p.name.toLocaleLowerCase().includes(search.toLocaleLowerCase());
  })
  return(
    <Container>
        <Header>User List</Header>
        <UserSearch value={search} onChange = {onChange} />
        <UserList>
        {
            filterTitle?.map((data,index) =>
                <EachUser key={index} 
                    user = {data}
                />
        )}
        </UserList>
        <br />
    </Container>
  );
}

export default AdminUserList;