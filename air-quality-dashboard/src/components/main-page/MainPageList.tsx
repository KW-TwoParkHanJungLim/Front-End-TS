import React, { useState } from "react";
import EachSensor from "../sensor-entry-page/EachSensor";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { fetchCoins } from "../../api/api";
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

function MainPage_List() {
  const [search, setSearch] = useState("");
  const [selectedSensors, setselectedSensors] = useState<string[]>([]);
  const { data } = useQuery<CoinInterface[]>(["allCoins"], fetchCoins);
  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value);
  };
  const filterTitle = data?.slice(0, 50).filter((p) => {
    return p.name.toLocaleLowerCase().includes(search.toLocaleLowerCase());
  });
  return (
    <Container>
      <SensorList>
        {filterTitle?.map((sensor) => (
          <EachSensor
            key={sensor.id}
            sensor={sensor}
            match={selectedSensors.includes(sensor.name)}
          />
        ))}
      </SensorList>
      <br />
    </Container>
  );
}

export default MainPage_List;
