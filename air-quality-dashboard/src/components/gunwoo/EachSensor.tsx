import styled from "styled-components";
import { CoinInterface } from "../jiwoo/MainPageList";

const Sensor = styled.div`
  display: flex;
  flex-wrap : wrap;
  flex-direction:column;
  background-color: #ecf0f1;
  border : 5px solid black;
  padding : 15px 20px;
  margin-bottom: 20px;
`;

const SensorAttributeWrapper = styled.div`
  display: grid;
  gap : 30px;
  grid-template-columns : repeat(4, 1fr);
  @media screen and (max-width : 800px){
    grid-template-columns : repeat(1, 1fr);
  }
  @media screen and (max-width : 1350px) and (min-width : 800px){
    grid-template-columns : repeat(2, 1fr);
  }
`;

const SensorAttributeBox = styled.div`
  height: 200px;
  border : 5px solid black;
  border-radius: 20px;
`;

const Header = styled.div`
  display:flex;
  align-items: center;
  margin-bottom: 10px;
  font-weight: 600;
`;


type CoinProps = {
  sensor : CoinInterface
}

const Img = styled.img`
    width: 25px;
    height: 25px;
    margin-right: 10px;
`;

function EachSensor({sensor} : CoinProps) : React.ReactElement{
  return (
    <Sensor>
      <Header>
        <Img src={`https://coinicons-api.vercel.app/api/icon/${sensor.symbol.toLowerCase()}`} />
				{sensor.id}		
      </Header>
      <SensorAttributeWrapper>
        <SensorAttributeBox/>
        <SensorAttributeBox/>
        <SensorAttributeBox/>
        <SensorAttributeBox/>
      </SensorAttributeWrapper>
    </Sensor>
  );
}

export default EachSensor;