import styled from "styled-components";


const SensorAttributeBox = styled.div`
  position:relative;
  width: 200px;
  height: 160px;
  margin-right:30px;
  border : 2px solid black;
  //background-color: #f6f6f6;
  border-radius: 20px;
  display: flex;
  justify-content : center;
  align-items : center;
  text-align : center;
  box-shadow:3px 3px #c5c5c5;
`;

const Name = styled.div`
  position:absolute; top:20px; font-size:18px;
`

const Avg = styled.div`
  position:absolute; top:55px; font-size:40px; font-weight:700;
`

const Unit = styled.div`
  position:absolute; top:105px; font-size:16px;
`

interface Sdata {
  name: string;
  avg : number;
  unit : string;
}

function SensorAttribute({name, avg, unit} : Sdata){
  return (
    <SensorAttributeBox>
      <Name>{name}</Name><br />
      <Avg>{avg}</Avg><br />
      <Unit>{unit}</Unit><br />
    </SensorAttributeBox>
  );
}

export default SensorAttribute;
