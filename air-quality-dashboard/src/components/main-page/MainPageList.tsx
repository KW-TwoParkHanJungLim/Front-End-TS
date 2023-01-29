import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { fetchMain } from "../../api/api";
import { getCookie } from "../../JWT/cookie";
import EachSensor from "./EachSensor";
import MainLoading from "./MainLoading";
import MainError from "./MainError";

const SensorList = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  margin: 520px 200px;
  //background-color: #ecf0f1;
  border: none;
  padding: 20px 40px;
  width: 1400px;
  margin: 50px auto;
  padding-top: 40px;
`;

const Container = styled.div`
  margin: 0 auto;
  padding-top: 30px;
  height: 100vh;
  position: relative;
  width: 1400px;
`;

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
  sensorInfoList: sensorlist[];
}

interface FetchItemOptions {
  method: string;
  body?: unknown;
}

function MainPage_List() {
  const navigate = useNavigate();
  const UserId: string = getCookie("user");
  const { data, isLoading, isError } = useQuery<MainInterface>(
    [UserId],
    () => fetchMain(UserId),
    {
      onError: (error) => {
        if (error === 403) {
          alert("로그인 정보가 없습니다.\n로그인 화면으로 이동합니다.");
          return navigate("/");
        }
      },
    }
  );

  const filterTitle = data?.sensorInfoList?.slice(0, 50).filter((p) => {
    return p.sensorName.toLocaleLowerCase();
  });
  return (
    <Container>
      {isLoading ? (
        <MainLoading />
      ) : isError ? (
        <MainError />
      ) : (
        <SensorList>
          {filterTitle?.map((sensor) => (
            <EachSensor
              UserId={UserId}
              key={sensor.sensorId}
              unit={data?.unit}
              sensor={sensor}
            />
          ))}
        </SensorList>
      )}
      <br />
    </Container>
  );
}

export default MainPage_List;
