import { Link } from "react-router-dom";
import styled from "styled-components";
import { CoinInterface } from "../../jiwoo/MainPageList";
import SensorAttribute from "./SensorAttribute";

const Sensor = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  flex-direction: column;
  background-color: #ecf0f1;
  border: 5px solid black;
  padding: 15px 20px;
  margin-bottom: 20px;
  box-shadow: 3px 3px #c5c5c5;
  overflow: auto;
  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    border-radius: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #888888;
  }
  &::-webkit-scrollbar-track {
    background-color: white;
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
  sensor: CoinInterface;
  match: boolean;
};

const Img = styled.img`
  width: 25px;
  height: 25px;
  margin-right: 10px;
`;

interface DummyData {
  name: string;
  avg: number;
  unit: string;
}

const dummyData = [
  { name: "Temperature", avg: 36.5, unit: "°C", score: 76.5 },
  { name: "Humidity", avg: 37.0, unit: "%", score: 47.2 },
  { name: "CO2", avg: 566.9, unit: "ppm", score: 81.2 },
  { name: "TVOC", avg: 8.2, unit: "ppb", score: 71.2 },
  { name: "PM01", avg: 9.2, unit: "㎍/㎡", score: 12.5 },
  { name: "PM2.5", avg: 4.1, unit: "㎍/㎡", score: 43.7 },
  { name: "PM10", avg: 566.9, unit: "㎍/㎡", score: 81.2 },
];

function EachSensor({ sensor, match }: CoinProps): React.ReactElement {
  return (
    <Sensor>
      <Link to={`/user/${sensor.id}`}>
        <Header>
          <Img
            src={`https://coinicons-api.vercel.app/api/icon/${sensor.symbol.toLowerCase()}`}
          />
          {sensor.name}
        </Header>
      </Link>
      <SensorAttributeWrapper>
        {dummyData.map((data, index) => (
          <SensorAttribute
            key={index}
            name={data.name}
            avg={data.avg}
            unit={data.unit}
          />
        ))}
      </SensorAttributeWrapper>
    </Sensor>
  );
}

export default EachSensor;
