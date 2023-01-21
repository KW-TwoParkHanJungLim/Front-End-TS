import styled from "styled-components";

const SensorAttributeBox = styled.div`
  position: relative;
  width: 180px;
  height: 160px;
  margin-right: 30px;
  border: 2px solid rgba(0, 0, 0, 0.2);
  //background-color: #f6f6f6;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  box-shadow: 3px 3px #c5c5c5;
`;

const Name = styled.div`
  position: absolute;
  top: 20px;
  font-size: 18px;
`;

const Value = styled.div`
  position: absolute;
  top: 55px;
  font-size: 40px;
  font-weight: 700;
`;

const Unit = styled.div`
  position: absolute;
  top: 105px;
  font-size: 16px;
`;

interface Sdata {
  name: string;
  value: number;
  unit: string;
}

function SensorAttribute({ name, value, unit }: Sdata) {
  return (
    <SensorAttributeBox>
      <Name>{name}</Name>
      <br />
      <Value>{value}</Value>
      <br />
      <Unit>{unit}</Unit>
      <br />
    </SensorAttributeBox>
  );
}

export default SensorAttribute;
