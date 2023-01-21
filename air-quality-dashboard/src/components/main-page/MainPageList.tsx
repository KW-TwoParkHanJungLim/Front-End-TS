import React, { useState } from "react";
import { useLocation } from 'react-router-dom';
import styled from "styled-components";
import EachSensor from "../sensor-entry-page/EachSensor";
import { useQuery } from "@tanstack/react-query";
//import { fetchCoins } from "../../api/api";
import { fetchMain } from "../../api/api_jiwoo";
import { getCookie } from "../../JWT/cookie";
import SensorSearch from "../sensor-entry-page/SensorSearch";

const SensorList = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  margin: 520px 200px;
  //background-color: #ecf0f1;
  border: none;
  padding: 20px 40px;
  width: 80%;
  margin: 50px auto;
`;

const Container = styled.div`
  margin: 0 auto;
  padding-top: 70px;
  padding-left: 50px;
  height: 200vh;
  position: relative;
  width: 100%;
`;

export interface CoinInterface {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

export interface sensorlist {
  sensorName: string;
  sensorId: string;
  logtime: string;
  airData: any;
}

export interface MainInterface {
  unit: {
    name: string;
    value: string;
  }; 
  sensorInfoList: sensorlist [];
} 


//const { data } = useQuery<CoinInterface[]>(["allCoins"], fetchCoins);
function MainPage_List() {
  const [search, setSearch] = useState("");
  const [selectedSensors, setselectedSensors] = useState<string[]>([]);
  const UserId : string = getCookie('user');
  const { data } = useQuery<MainInterface>([UserId], () => fetchMain(UserId));

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value);
  };
  
  const filterTitle = data?.sensorInfoList?.slice(0, 50).filter((p) => {
    return p.sensorName.toLocaleLowerCase().includes(search.toLocaleLowerCase());
  });
  return (
    <Container>
      <SensorList>
        {filterTitle?.map((sensor) => (
          <EachSensor
            UserId={UserId}
            key={sensor.sensorId}
            unit={data?.unit}
            sensor={sensor}
            match={selectedSensors.includes(sensor.sensorName)}
          />
        ))}
      </SensorList>
      <br />
    </Container>
  );
}

export default MainPage_List;

