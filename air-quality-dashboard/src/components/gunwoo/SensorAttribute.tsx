import styled from "styled-components";

const SensorAttributeBox = styled.div`
  width: 160px;
  height: 160px;
  border : 5px solid black;
  border-radius: 20px;
  display: flex;
  justify-content : center;
  align-items : center;
  text-align : center;
`;

interface Sdata {
  name: string;
  avg : number;
  unit : string;
}

function SensorAttribute({name, avg, unit} : Sdata){
  return (
    <SensorAttributeBox>
      {name}<br />{avg}<br />{unit} 
    </SensorAttributeBox>
  );
}

export default SensorAttribute;
