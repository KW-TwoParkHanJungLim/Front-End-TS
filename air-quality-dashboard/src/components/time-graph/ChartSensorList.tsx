import { useQuery } from "@tanstack/react-query";
import React, { Dispatch, SetStateAction, useState } from "react";
import styled from "styled-components";
import { fetchCoins } from "../../api/api";
import { CoinInterface } from "../main-page/MainPageList";
import AttributePreview from "./AttributePreiview";
import SensorSearch from "../sensor-entry-page/SensorSearch";

const Container = styled.div`
  width: 1700px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`;

const Wrapper = styled.div`
  display: flex;
  margin-top: 56px;
  position: relative;
`;

const Header = styled.h1`
  margin-bottom: 50px;
  font-weight: 700;
  font-size: 46px;
  color: #2c3e50;
  position: relative;
  span {
    z-index: 1;
    font-size: 35px;
    position: absolute;
    left: 20px;
    top: 110px;
    opacity: 0.5;
  }
`;

const SensorList = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(4, 1fr);
  gap: 10px;
  width: 1900px;
  height: 400px;
  overflow: scroll;
  overflow-x: hidden;
  padding-right: 10px;

  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.4);
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.3);
    border-radius: 6px;
  }
`;

const Notification = styled.span`
  position: absolute;
  right: 20px;
  top: -30px;
  color: tomato;
`;

const Sensor = styled.li<{ match: boolean }>`
  background-color: ${(props) => (props.match ? "#20c997" : "#ecf0f1")};
  color: ${(props) => props.theme.textColor};
  font-weight: 600;
  border-radius: 10px;
  display: flex;
  align-items: center;
  padding: 20px;

  &:hover {
    color: ${(props) => (props.match ? "white" : props.theme.accentColor)};
  }
  cursor: pointer;
  height: 90px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Img = styled.img`
  width: 25px;
  height: 25px;
  margin-right: 10px;
`;

const Loading = styled.div`
  background-color: #ecf0f1;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  font-size: 32px;
  font-weight: 600;
`;

interface IProp {
  selectedSensor: string[];
  setSelectedSensor: Dispatch<SetStateAction<string[]>>;
}

const ChartSensorList = ({ selectedSensor, setSelectedSensor }: IProp) => {
  const { isLoading, data } = useQuery<CoinInterface[]>(
    ["allCoins"],
    fetchCoins
  );
  const [search, setSearch] = useState("");
  const [preview, setPreview] = useState("");

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value);
  };

  const onMouseOver = (name: string) => {
    setPreview(name);
  };

  const onSensorClicked = (sensorId: string) => {
    const newSensors = selectedSensor.slice();
    if (newSensors.includes(sensorId)) {
      const idx = newSensors.findIndex((item) => item === sensorId);
      newSensors.splice(idx, 1);
      setSelectedSensor(newSensors);
    } else {
      if (newSensors.length >= 5) {
        return;
      }
      newSensors.push(sensorId);
      setSelectedSensor(newSensors);
    }
  };

  return (
    <Container>
      <Header>Sensor List</Header>
      <SensorSearch search={search} onChange={onChange} />
      <Wrapper>
        <Notification>
          {selectedSensor.length === 5 ? "최대 5개까지 선택 가능" : null}
        </Notification>
        <AttributePreview name={preview} />
        {isLoading ? (
          <Loading>Loading...</Loading>
        ) : (
          <SensorList>
            {data
              ?.slice(0, 50)
              .filter((p) => {
                return p.name
                  .toLocaleLowerCase()
                  .includes(search.toLocaleLowerCase());
              })
              .map((sensor) => (
                <Sensor
                  match={selectedSensor.includes(sensor.name)}
                  key={sensor.id}
                  onClick={() => onSensorClicked(sensor.name)}
                  onMouseOver={() => onMouseOver(sensor.name)}
                >
                  <Img
                    src={`https://coinicons-api.vercel.app/api/icon/${sensor.symbol.toLowerCase()}`}
                  />
                  {sensor.name}
                </Sensor>
              ))}
          </SensorList>
        )}
      </Wrapper>
    </Container>
  );
};

export default ChartSensorList;
