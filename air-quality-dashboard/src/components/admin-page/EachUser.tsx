import styled from "styled-components";
import { Link } from 'react-router-dom';

const SensorAttributeBox = styled.div`
  position:relative;
  border : 3px solid rgba(0, 0, 0, 0.2);
  border-radius: 15px;
  display: flex;
  width:100%;
  height:60px; 
  flex-wrap : wrap;
  flex-direction:column;
  //background-color: #f6f6f6;
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
    user : string
}

function EachUser({user} : UserProps){
  return (
    <Link to= {`/${user}/main`} state={{
      UserId: user
    }}>
      <SensorAttributeBox>
        <Name>{user}</Name><br />
      </SensorAttributeBox>
    </Link>
  );
}

export default EachUser;
