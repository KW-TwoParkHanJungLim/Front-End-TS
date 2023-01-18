import { useQuery } from "@tanstack/react-query";
import React, { Dispatch, SetStateAction, useState } from "react";
import styled from "styled-components";
import { fetchCoins, fetchGraphSensorList } from "../../api/api";
import { CoinInterface } from "../main-page/MainPageList";
import AttributePreview from "./AttributePreiview";
import SensorSearch from "../sensor-entry-page/SensorSearch";
import { getToday } from "../../pages/SensorEntryPage";
import { getFace } from "../../function/getIcon";
import { scoreTotal } from "../../function/scoreCalculate";
import { getStatus } from "../../function/getStatus";

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
  height: 450px;
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
  background-color: "white";
  border: 1px solid rgba(0, 0, 0, 0.1);
  &:hover {
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  }
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  color: ${(props) =>
    props.match ? props.theme.accentColor : props.theme.textColor};
  font-weight: 600;
  border-radius: 10px;
  display: flex;
  align-items: center;
  padding: 20px;

  &:hover {
    color: ${(props) => props.theme.accentColor};
  }
  cursor: pointer;
  height: 90px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  span {
    margin-bottom: 5px;
  }
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
  selectedSensorId: string[];
  setSelectedSensorId: Dispatch<SetStateAction<string[]>>;
}

interface ISensor {
  sensorName: string;
  sensorId: string;
  logtime: string;
  airData: {
    temp: number;
    humi: number;
    co2: number;
    tvoc: number;
    pm01: number;
    pm25: number;
    pm10: number;
  };
}

const ChartSensorList = ({
  selectedSensor,
  setSelectedSensor,
  selectedSensorId,
  setSelectedSensorId,
}: IProp) => {
  const { isLoading, data, isError } = useQuery<ISensor[]>(
    ["allSensors", "axr-kotra"],
    () => fetchGraphSensorList("axr-inducwon")
  );
  const [hoverSensor, setHoverSensor] = useState<ISensor>();
  const [search, setSearch] = useState("");
  const [preview, setPreview] = useState("");

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value);
  };

  const onMouseOver = (name: string) => {
    setPreview(name);
    setHoverSensor(
      data?.filter((v) => {
        if (v.sensorName === name) return true;
      })[0]
    );
  };

  const onSensorClicked = (sensorName: string, sensorId: string) => {
    const newSensors = selectedSensor.slice();
    const newSensorsId = selectedSensorId.slice();

    if (newSensorsId.includes(sensorId)) {
      const idx = newSensorsId.findIndex((item) => item === sensorId);
      newSensors.splice(idx, 1);
      newSensorsId.splice(idx, 1);
      setSelectedSensor(newSensors);
      setSelectedSensorId(newSensorsId);
    } else {
      if (newSensors.length >= 3) {
        return;
      }
      newSensors.push(sensorName);
      newSensorsId.push(sensorId);
      setSelectedSensor(newSensors);
      setSelectedSensorId(newSensorsId);
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
        <AttributePreview
          isLoading={isLoading}
          name={preview}
          data={hoverSensor?.airData}
        />
        {isLoading ? (
          <Loading>Loading...</Loading>
        ) : (
          <SensorList>
            {data
              ?.slice(0, 50)
              .filter((p) => {
                return p.sensorName
                  .toLocaleLowerCase()
                  .includes(search.toLocaleLowerCase());
              })
              .map((sensor) => {
                const score = scoreTotal(sensor.airData, 5);
                const res = getStatus(score);
                const color = res.color[0];
                const state = res.state[0];

                return (
                  <>
                    <Sensor
                      match={selectedSensor.includes(sensor.sensorName)}
                      key={sensor.sensorId}
                      onClick={() =>
                        onSensorClicked(sensor.sensorName, sensor.sensorId)
                      }
                      onMouseOver={() => onMouseOver(sensor.sensorName)}
                    >
                      {getFace(state, color, isError)}
                      <span>{sensor.sensorName}</span>
                    </Sensor>
                  </>
                );
              })}
          </SensorList>
        )}
      </Wrapper>
    </Container>
  );
};

export default ChartSensorList;
