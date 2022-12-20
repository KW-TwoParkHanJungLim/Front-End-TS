import styled from "styled-components";
import { CoinInterface } from "../jiwoo/MainPageList";

const SensorAttributeBox = styled.div`
  position:relative;
  border : 3px solid black;
  border-radius: 15px;
  display: flex;
  width:100%;
  height:60px; 
  flex-wrap : wrap;
  flex-direction:column;
  background-color: #ecf0f1;
  padding : 15px 20px;
  margin-bottom: 20px;
  justify-content : center;
  align-items : center;
  text-align : center;
  box-shadow:3px 3px #c5c5c5;
`;

const Name = styled.div`
  position:absolute; top:20px; font-size:20px; font-weight:700;
`

type UserProps = {
    user : CoinInterface
}

interface Udata {
  name: string;
}

function EachUser({user} : UserProps){
  return (
    <SensorAttributeBox>
      <Name>{user.name}</Name><br />
    </SensorAttributeBox>
  );
}

export default EachUser;
