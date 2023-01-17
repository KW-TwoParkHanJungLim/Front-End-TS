import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { fetchCoinInfo, fetchCoins, fetchSensorAvg } from "../api/api";
import UpperPage from "../components/UpperPage";
import { ko } from "date-fns/esm/locale";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SensorEntryGraph from "../components/sensor-entry-page/SensorEntryGraph";
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

interface InfoInterface {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}

interface RouteParams {
  sensorId: string;
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

interface IAvg {
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
}

function getToday(date: Date) {
  let year = date.getFullYear();
  let month = ("0" + (1 + date.getMonth())).slice(-2);
  let day = ("0" + date.getDate()).slice(-2);

  return `${year}-${month}-${day}`;
}

function SensorEntryPage() {
  const { sensorId } = useParams<keyof RouteParams>() as RouteParams;
  const [startDate, setStartDate] = useState(new Date());
  const [avgs, setAvgs] = useState<IAvgData[]>([]);
  const { isLoading: infoLoading, data: infoData } = useQuery<InfoInterface>(
    ["info", sensorId],
    () => fetchCoinInfo(sensorId)
  );
  const {
    isLoading: testLoading,
    data: testData,
    isError,
  } = useQuery<IAvg | undefined>(["test", startDate], () =>
    fetchSensorAvg(getToday(startDate))
  );

  console.log(testData);

  useEffect(() => {
    if (!testLoading && !isError) {
      setAvgs([
        {
          name: "Temperature",
          avg: testData ? testData.dayAvg.temp : 0,
          score: scoreTemp(testData?.dayAvg.temp, startDate.getMonth()),
          weekAvg: testData ? testData.weekAvg.temp : 0,
          weekScore: scoreTemp(testData?.weekAvg.temp, startDate.getMonth()),
          unit: "°C",
        },
        {
          name: "Humidity",
          avg: testData ? testData.dayAvg.humi : 0,
          score: scoreHumi(testData?.dayAvg.humi, 4),
          weekAvg: testData ? testData.weekAvg.humi : 0,
          weekScore: scoreHumi(testData?.weekAvg.humi, startDate.getMonth()),
          unit: "%",
        },
        {
          name: "CO2",
          avg: testData ? testData.dayAvg.co2 : 0,
          score: scoreCo2(testData?.dayAvg.co2),
          weekAvg: testData ? testData.weekAvg.co2 : 0,
          weekScore: scoreCo2(testData?.weekAvg.co2),
          unit: "ppm",
        },
        {
          name: "PM1.0",
          avg: testData ? testData.dayAvg.pm01 : 0,
          score: scorePM25(testData?.dayAvg.pm01),
          weekAvg: testData ? testData.weekAvg.pm01 : 0,
          weekScore: scorePM25(testData?.weekAvg.pm01),
          unit: "㎍/m³",
        },
        {
          name: "PM10",
          avg: testData ? testData.dayAvg.pm10 : 0,
          score: scorePM10(testData?.dayAvg.pm10),
          weekAvg: testData ? testData.weekAvg.pm10 : 0,
          weekScore: scorePM10(testData?.weekAvg.pm10),
          unit: "㎍/m³",
        },
        {
          name: "PM2.5",
          avg: testData ? testData.dayAvg.pm25 : 0,
          score: scorePM25(testData?.dayAvg.pm25),
          weekAvg: testData ? testData.weekAvg.pm25 : 0,
          weekScore: scorePM25(testData?.weekAvg.pm25),
          unit: "㎍/m³",
        },
        {
          name: "TVOC",
          avg: testData ? testData.dayAvg.tvoc : 0,
          score: scoreTvoc(testData?.dayAvg.tvoc),
          weekAvg: testData ? testData.weekAvg.tvoc : 0,
          weekScore: scoreTvoc(testData?.weekAvg.tvoc),
          unit: "ppb",
        },
      ]);
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
        <Header>{infoData?.name}</Header>
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
                  return acc + v.score;
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
