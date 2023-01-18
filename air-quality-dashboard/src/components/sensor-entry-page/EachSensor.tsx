import React, {useState} from 'react';
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchSensorAvg } from "../../api/api";
import { motion } from "framer-motion";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { sensorlist } from "../main-page/MainPageList";
//import { CoinInterface } from "../main-page/MainPageList";
import SensorAttribute from "./SensorAttribute";
import { getStatus } from "../../function/getStatus";
import { IAvg, IAvgData, getToday } from "../../pages/SensorEntryPage";
import { getFace } from '../../function/getIcon';
import {
  scoreCo2,
  scoreHumi,
  scorePM10,
  scorePM25,
  scoreTemp,
  scoreTvoc,
} from "../../function/scoreCalculate";
 
const Sensor = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  flex-direction: column;
  background-color: white;
  border: 3px solid rgba(0, 0, 0, 0.2);
  border-opacity : 0.2;
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
  font-size:24px;
  font-weight: 600;
`;

type MainProps = {
  UserId: string;
  unit: any;
  sensor: sensorlist;
  //sensor: CoinInterface;
  match: boolean;
};

const SensorScroll = styled(motion.div)`
  display: flex;
  height: 160px;
  flex-wrap: nowrap;
`;

//dummyData 대신 실제 data 이용하여 값 띄울 수 있도록 코드 수정
//단위(unit) 받을 수 있는 API 요청하기

function EachSensor({ UserId, unit, sensor, match }: MainProps): React.ReactElement {
  const getValues = Object.values(sensor.airData);
  var Data = [];
  var i;
  for(i=0; i<7; i++)  {
    var values;
    if(getValues[i] == null) values = "-";
    else values = getValues[i];
    Data.push({_name: unit[i].name, _value: values, _unit: unit[i].value})
  }

  const startDate = new Date();
  const {
    isLoading: testLoading,
    data: testData,
    isError,
  } = useQuery<IAvg | undefined>(["test", startDate], () =>
    fetchSensorAvg(getToday(startDate))
  );
  const avgs = [
    {
      dayscore: scoreTemp(testData?.dayAvg.temp, startDate.getMonth()),
      weekscore: scoreTemp(testData?.weekAvg.temp, startDate.getMonth())
    },
    {
      dayscore: scoreHumi(testData?.dayAvg.humi, startDate.getMonth()),
      weekscore: scoreHumi(testData?.weekAvg.humi, startDate.getMonth())
    },
    {
      dayscore: scoreCo2(testData?.dayAvg.co2),
      weekscore: scoreCo2(testData?.weekAvg.co2)
    },
    {
      dayscore: scorePM25(testData?.dayAvg.pm01),
      weekscore: scorePM25(testData?.weekAvg.pm01)
    },
    {
      dayscore: scorePM25(testData?.dayAvg.pm25),
      weekscore:scorePM25(testData?.weekAvg.pm25)
    },
    {
      dayscore: scorePM10(testData?.dayAvg.pm10),
      weekscore: scorePM10(testData?.weekAvg.pm10)
    },
    {
      dayscore: scoreTvoc(testData?.dayAvg.tvoc),
      weekscore: scorePM10(testData?.weekAvg.pm10)
    }
  ]
  
  const score = Number(
    (
      avgs.reduce((acc, v) => {
        return acc + v.weekscore;
      }, 0) / avgs.length
    ).toFixed(1)
  )
  const color = getStatus(score).color[0];
  const state = getStatus(score).state[0];  

  return (
    <Sensor>
        <Header>
          {getFace(state, color, isError)}
          {sensor.sensorName}&nbsp;&nbsp;
          <Link to={`/${UserId}/${sensor.sensorId}`}>
            <FontAwesomeIcon icon="magnifying-glass" size="1x" />
          </Link>  
        </Header>
      <span>좌우로 드래그 가능</span>
      <SensorAttributeWrapper>
        <SensorScroll 
          drag="x"
          dragConstraints={{ right: 0, left: -250 }}>
          {Data.map((p: any) => (
          <motion.div>
            <SensorAttribute
              key={p._name}
              name={p._name}
              value={p._value}
              unit={p._unit}
            />
          </motion.div>
          ))}
        </SensorScroll>
      </SensorAttributeWrapper>
    </Sensor>
  );
}

export default EachSensor;
