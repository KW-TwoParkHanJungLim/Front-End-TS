import React, { useState } from 'react';
import styled from 'styled-components';
import UserSearch from './UserSearch';
import EachUser from './EachUser';
import { useQuery } from '@tanstack/react-query';
import { fetchCoins } from '../../api/api';
import { fetchUserList } from '../../api/api_jiwoo';

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

/*
export interface ListInterface {
  
}
*/

function AdminUserList(){
  const [search, setSearch] = useState("");
  //const { Userlist } = useQuery<ListInterface>([], fetchUserList); 
  const { data } = useQuery<CoinInterface[]>(["allCoins"], fetchCoins);
  const onChange = (e : React.FormEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value);
  };
  const filterTitle = data?.slice(0,50).filter((p) => {
    return p.name.toLocaleLowerCase().includes(search.toLocaleLowerCase());
  })
  return(
    <Container>
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