import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { CoinInterface } from "../main-page/MainPageList";
import SensorAttribute from "./SensorAttribute";

 
const Sensor = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  flex-direction: column;
  background-color: white;
  border: 3px solid black;
  border-radius : 20px;
  padding: 15px 20px;
  margin-bottom: 20px;
  box-shadow: 3px 3px #c5c5c5;
  overflow: hidden;
  span {
    position: relative;
    left:1200px;
    bottom: 30px;
    opacity: 0.8;
  }
`;

const SensorAttributeWrapper = styled.div`
  display: flex;
  gap: 30px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  font-weight: 600;
`;

type CoinProps = {
  UserId: string;
  sensor: CoinInterface;
  match: boolean;
};

const Img = styled.img`
  width: 25px;
  height: 25px;
  margin-right: 10px;
`;

const SensorScroll = styled(motion.div)`
  display: flex;
  height: 160px;
  flex-wrap: nowrap;
`;

interface DummyData {
  data: {
    name: string;
    avg: number;
    unit: string; 
  }[];
}

//dummyData 대신 실제 data 이용하여 값 띄울 수 있도록 코드 수정
//단위(unit) 받을 수 있는 API 요청하기

const dummyData = [
  { name: "Temperature", avg: 36.5, unit: "°C" },
  { name: "Humidity", avg: 37.0, unit: "%" },
  { name: "CO2", avg: 566.9, unit: "ppm" },
  { name: "TVOC", avg: 8.2, unit: "ppb" },
  { name: "PM01", avg: 9.2, unit: "㎍/㎡" },
  { name: "PM2.5", avg: 4.1, unit: "㎍/㎡" },
  { name: "PM10", avg: 566.9, unit: "㎍/㎡" },
];

function EachSensor({ UserId, sensor, match }: CoinProps): React.ReactElement {
  return (
    <Sensor>
      <Link to={`/${UserId}/${sensor.id}`}>
        <Header>
          <Img
            src={`https://coinicons-api.vercel.app/api/icon/${sensor.symbol.toLowerCase()}`}
          />
          {sensor.name}
        </Header>
      </Link>
      <span>좌우로 드래그 가능</span>
      <SensorAttributeWrapper>
        <SensorScroll 
          drag="x"
          dragConstraints={{ right: 0, left: -250 * (dummyData.length - 6) }}>
          {dummyData.map((data, index) => (
          <motion.div>
            <SensorAttribute
              key={index}
              name={data.name}
              avg={data.avg}
              unit={data.unit}
            />
          </motion.div>
          ))}
        </SensorScroll>
      </SensorAttributeWrapper>
    </Sensor>
  );
}

export default EachSensor;
