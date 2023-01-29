import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/esm/locale";
import { fetchSensorAvg } from "../api/api";
import UpperPage from "../components/UpperPage";
import Summary from "../components/sensor-entry-page/Summary";
import GraphSlider from "../components/sensor-entry-page/GraphSlider";

import {
  scoreCo2,
  scoreHumi,
  scorePM10,
  scorePM25,
  scoreTemp,
  scoreTvoc,
} from "../function/scoreCalculate";
import { getCookie } from "../JWT/cookie";

const Container = styled.div`
  margin: 0 auto;
  padding-top: 130px;
  height: 200vh;
  position: relative;
  width: 1300px;
  margin-bottom: 100px;
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

interface RouteParams {
  sensorId: string;
  user: string;
}

const Header = styled.h1`
  margin-bottom: 50px;
  font-weight: 700;
  font-size: 46px;
  color: #2c3e50;
  position: relative;
  span {
    z-index: 0;
    font-size: 35px;
    position: absolute;
    left: 20px;
    top: 110px;
    opacity: 0.5;
  }
`;

const SDatePicker = styled(DatePicker)`
  padding: 20px 30px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  width: 320px;
  font-size: 20px;
  font-weight: 700;
  color: rgba(0, 0, 0, 0.5);
  &:focus {
    color: rgba(0, 0, 0, 1);
  }
`;

const SummaryContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  width: 100%;
  height: 200px;
  gap: 80px;
  margin-bottom: 50px;
`;

const Calendar = styled.div`
  position: relative;
  padding-bottom: 50px;
  margin-bottom: 50px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
`;

export interface IAvg {
  dayAvg: {
    co2: number;
    humi: number;
    pm01: number;
    pm10: number;
    pm25: number;
    temp: number;
    tvoc: number;
  };
  weekAvg: {
    co2: number;
    humi: number;
    pm01: number;
    pm10: number;
    pm25: number;
    temp: number;
    tvoc: number;
  };
}

export interface IAvgData {
  name: string;
  avg: number;
  weekAvg: number;
  score: number;
  weekScore: number;
  unit: string;
  type?: string;
}

export function getToday(date: Date) {
  let year = date.getFullYear();
  let month = ("0" + (1 + date.getMonth())).slice(-2);
  let day = ("0" + date.getDate()).slice(-2);

  return `${year}-${month}-${day}`;
}

function SensorEntryPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, sensorId } = useParams<keyof RouteParams>() as RouteParams;
  const [startDate, setStartDate] = useState(new Date());
  const [avgs, setAvgs] = useState<IAvgData[]>([]);
  const {
    isLoading: testLoading,
    data: testData,
    isError,
  } = useQuery<IAvg>(
    ["test", startDate],
    () => {
      return fetchSensorAvg(getToday(startDate), user, sensorId);
    },
    {
      onError: (error) => {
        if (error === 403) {
          alert("로그인 정보가 없습니다.\n로그인 화면으로 이동합니다.");
          return navigate("/");
        }
      },
    }
  );

  useEffect(() => {
    if (!testLoading && !isError) {
      setAvgs(
        [
          {
            name: "Temperature",
            avg: testData.dayAvg.temp ? testData.dayAvg.temp : -999,
            score: scoreTemp(testData?.dayAvg.temp, startDate.getMonth()),
            weekAvg: testData.weekAvg.temp ? testData.weekAvg.temp : -999,
            weekScore: scoreTemp(testData?.weekAvg.temp, startDate.getMonth()),
            unit: "°C",
          },
          {
            name: "Humidity",
            avg: testData.dayAvg.humi ? testData.dayAvg.humi : -999,
            score: scoreHumi(testData?.dayAvg.humi, 4),
            weekAvg: testData.weekAvg.humi ? testData.weekAvg.humi : -999,
            weekScore: scoreHumi(testData?.weekAvg.humi, startDate.getMonth()),
            unit: "%",
          },
          {
            name: "CO2",
            avg: testData.dayAvg.co2 ? testData.dayAvg.co2 : -999,
            score: scoreCo2(testData?.dayAvg.co2),
            weekAvg: testData.weekAvg.co2 ? testData.weekAvg.co2 : -999,
            weekScore: scoreCo2(testData?.weekAvg.co2),
            unit: "ppm",
          },
          {
            name: "PM1.0",
            avg: testData.dayAvg.pm01 ? testData.dayAvg.pm01 : -999,
            score: scorePM25(testData?.dayAvg.pm01),
            weekAvg: testData.weekAvg.pm01 ? testData.weekAvg.pm01 : -999,
            weekScore: scorePM25(testData?.weekAvg.pm01),
            unit: "㎍/m³",
          },
          {
            name: "PM10",
            avg: testData.dayAvg.pm10 ? testData.dayAvg.pm10 : -999,
            score: scorePM10(testData?.dayAvg.pm10),
            weekAvg: testData.weekAvg.pm10 ? testData.weekAvg.pm10 : -999,
            weekScore: scorePM10(testData?.weekAvg.pm10),
            unit: "㎍/m³",
          },
          {
            name: "PM2.5",
            avg: testData.dayAvg.pm25 ? testData.dayAvg.pm25 : -999,
            score: scorePM25(testData?.dayAvg.pm25),
            weekAvg: testData.weekAvg.pm25 ? testData.weekAvg.pm25 : -999,
            weekScore: scorePM25(testData?.weekAvg.pm25),
            unit: "㎍/m³",
          },
          {
            name: "TVOC",
            avg: testData.dayAvg.tvoc ? testData.dayAvg.tvoc : -999,
            score: scoreTvoc(testData?.dayAvg.tvoc),
            weekAvg: testData.weekAvg.tvoc ? testData.weekAvg.tvoc : -999,
            weekScore: scoreTvoc(testData?.weekAvg.tvoc),
            unit: "ppb",
          },
        ].filter((v) => {
          return v.avg !== -999;
        })
      );
    } else {
      setAvgs([]);
    }
  }, [testLoading, startDate]);

  return (
    <>
      <div className="MainPage">
        <UpperPage />
      </div>
      <Container>
        <Header>{location.state ? location.state.sensorName : "Error"}</Header>
        <Calendar>
          <SDatePicker
            selected={startDate}
            onChange={(date: Date) => setStartDate(date)}
            selectsStart
            dateFormat={" yyyy / MM / dd"}
            locale={ko}
          />
        </Calendar>
        <SummaryContainer>
          <Summary
            type="Today"
            isLoading={testLoading}
            isError={isError}
            score={Number(
              (
                avgs.reduce((acc, v) => {
                  return Number(acc) + Number(v.score);
                }, 0) / avgs.length
              ).toFixed(1)
            )}
          />
          <Summary
            type="Weekly"
            isLoading={testLoading}
            isError={isError}
            score={Number(
              (
                avgs.reduce((acc, v) => {
                  return acc + v.weekScore;
                }, 0) / avgs.length
              ).toFixed(1)
            )}
          />
        </SummaryContainer>
        <GraphSlider
          data={avgs}
          type="Today"
          isLoading={testLoading}
          isError={isError}
        />
        <GraphSlider
          data={avgs}
          type="Weekly"
          isLoading={testLoading}
          isError={isError}
        />
      </Container>
    </>
  );
}

export default SensorEntryPage;
