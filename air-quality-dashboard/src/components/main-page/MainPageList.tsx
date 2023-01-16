import React, { useState } from "react";
//import { useLocation } from 'react-router-dom';
import styled from "styled-components";
import EachSensor from "../sensor-entry-page/EachSensor";
import { useQuery } from "@tanstack/react-query";
//import { fetchCoins } from "../../api/api";
import { fetchMain } from "../../api/api_jiwoo";
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


function MainPage_List() {
  const [search, setSearch] = useState("");
  const [selectedSensors, setselectedSensors] = useState<string[]>([]);
  const UserInfo = {
    Id: "USER"
  };
  //const location = useLocation();
  //var UserId;
  //const { UserInfo } = useQuery<Info[]>([], fetchUser); //API 통해 사용자 정보 가져오기
  /*
  if(location.state.UserId === null) { //일반 사용자가 로그인해 메인 화면을 보게 되는 경우
    UserId = UserInfo.ID;
  } else { //관리자가 사용자 리스트에서 사용자를 선택하여 그의 메인 리스트를 보게 되는 경우
    UserId = location.state.UserId;
  }
  */
 //const { data } = useQuery<CoinInterface[]>(["allCoins"], fetchCoins);
  const UserId: string = "axr-inducwon";
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

