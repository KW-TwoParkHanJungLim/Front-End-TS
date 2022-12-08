import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import DatePicker from "react-datepicker";
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { fetchCoinInfo, fetchCoins } from '../../api/api';
import UpperPage from '../../components/jiwoo/UpperPage';
import { ko } from 'date-fns/esm/locale';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SensorEntryGraph from '../../components/gunwoo/SensorEntryGraph';

const Container = styled.div`
  margin: 0 auto;
  padding-top: 130px;
  height: 150vh;
  position: relative;
  width: 80%;
`;

export interface CoinInterface{
  id: string,
  name: string,
  symbol: string,
  rank: number,
  is_new: boolean,
  is_active: boolean,
  type: string,
}

interface InfoInterface{
  id : string;
  name :     string;
  symbol :     string;
  rank :     number;
  is_new :     boolean;
  is_active :     boolean;
  type :     string;
  description :     string;
  message :     string;
  open_source :     boolean;
  started_at :     string;
  development_status :     string;
  hardware_wallet :     boolean;
  proof_type :     string;
  org_structure :     string;
  hash_algorithm :     string;
  first_data_at :     string;
  last_data_at :     string;
}

interface RouteParams{
	sensorId : string;
}

interface DummyData{
  name: string;
  score: number;
  avg : number;
}

const Header = styled.h1`
  margin-bottom: 50px;
  font-weight: 700;
  font-size : 46px;
  color: #2c3e50;
  position : relative;
  span{
    z-index : 1;
    font-size : 35px;
    position : absolute;
    left : 20px;
    top : 110px;
    opacity : 0.5;
  }
`;

const SDatePicker = styled(DatePicker)`
  padding: 20px 60px;
  border : 1px solid rgba(0,0,0,0.2);
  border-radius: 5px;
  width: 360px;
  font-size : 20px;
  font-weight: 700;
  color : rgba(0,0,0,0.5);
  &: focus{
    color: rgba(0,0,0,1);
  }
`;

const Calendar = styled.div`
  position: relative;
  span{
    z-index : 1;
    font-size : 35px;
    position : absolute;
    left : 20px;
    top : 12px;
    opacity : 0.5;
  }
  padding-bottom : 50px;
  margin-bottom: 50px;
  border-bottom: 1px solid rgba(0,0,0,0.2);
`;

const SummaryContainer = styled.div`
  display: grid;
  grid-template-columns : repeat(2, 1fr);
  width:100%;
  height:250px;
  gap:80px;
  margin-bottom: 50px;  
`;
  
const Summary = styled.div`
  display: grid;
  background-color: #ecf0f1;
  grid-template-columns: 3fr 2fr;
  border: 1px solid rgba(0,0,0,0.2);
  padding: 20px;
  span{
    font-size:30px;
    line-height: 40px;
    font-weight: 700;
    opacity: 0.7;
  }
`;

const SummaryEntry = styled.div`
  display:flex;
  justify-content: center;
  align-items: center;
  padding-left: 70px;
  span{
    font-size: 40px;
    font-weight: 700;
    opacity: 0.8;
  }
`;

const Circle = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #20c997;
  margin-right: 20px;
`;

const TodayAvgGraphContainer = styled.div`
  display: flex;
  background-color: white;
  width: 100%;
  flex-direction: column;
  height:420px;
  border: 1px solid rgba(0,0,0,0.2);
  margin-bottom: 50px;
`;

const TodayAvgGraphHeader = styled.div`
  width: 100%;
  border-bottom: 1px solid rgba(0,0,0,0.2);
  height: 140px;
  display:flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding: 20px;
  font-weight: 800;
  background-color:#ecf0f1;
  h3{
    font-size: 24px;
    margin-bottom: 15px;
    opacity: 0.7;
  }
  h4{
    font-size: 20px;
    opacity: 0.5;
  }
`;

const TodayAvgGraph = styled.div`
  display: inline-block;
  width:100%;
  height:320px;
  overflow-y: scroll;
  white-space : nowrap;
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

function SensorEntryPage(){
  const {sensorId} = useParams<keyof RouteParams>() as RouteParams;
  const [startDate , setStartDate] = useState(new Date());
  const {isLoading : infoLoading, data : infoData} = useQuery<InfoInterface>(["info", sensorId], () => fetchCoinInfo(sensorId));
  const dummyData = [
  {name: "Temperature", avg : 36.5, score: 76.5},
  {name : "Humidity", avg : 37.0, score: 47.2},
  {name : "CO2", avg : 566.9, score: 81.2},
  {name: "PM2.5", avg: 8.2, score: 71.2},
  {name: "Whatever", avg : 9.2, score:12.5},
  {name: "Normal", avg : 4.1, score: 43.7},
  {name : "CO2", avg : 566.9, score: 81.2},
  ];

  return(
  <>
    <div className="MainPage">
          <UpperPage/>
    </div>  
    <Container>
      <Header>{infoData?.name}</Header>
      <Calendar>
        <span><FontAwesomeIcon icon = 'chevron-down'/></span>
        <SDatePicker
          selected={startDate} 
          onChange = {(date : Date)  => setStartDate(date)} 
          selectsStart
          dateFormat={" yyyy / MM / dd"}
          locale = {ko}
        />
      </Calendar>
      <SummaryContainer>
        <Summary>
          <span>Today Average Sensor Score</span>
          <SummaryEntry>
            <Circle/>
            <span>71.3</span>
          </SummaryEntry>
        </Summary>
        <Summary>
          <span>Weekly Average Sensor Score</span>
          <SummaryEntry>
            <Circle/>
            <span>71.3</span>
          </SummaryEntry>
        </Summary>
      </SummaryContainer>
      <TodayAvgGraphContainer>
        <TodayAvgGraphHeader>
          <h3>{"Today Average"}</h3>
          <h4>{"오늘의 평균 측정 값을 확인하세요."}</h4>
        </TodayAvgGraphHeader>
        <TodayAvgGraph>
          {
            dummyData.map((data,index) => <SensorEntryGraph 
              key = {index}
              name = {data.name}
              avg = {data.avg}
              score = {data.score}
            />)
          }
        </TodayAvgGraph>
      </TodayAvgGraphContainer>
      <TodayAvgGraphContainer>
        <TodayAvgGraphHeader>
          <h3>{"Weekly Average"}</h3>
          <h4>{"주간 평균 측정 값을 확인하세요."}</h4>
        </TodayAvgGraphHeader>
        <TodayAvgGraph>
        {
            dummyData.map((data,index) => <SensorEntryGraph 
              key = {index}
              name = {data.name}
              avg = {data.avg}
              score = {data.score}
            />)
          }
        </TodayAvgGraph>
      </TodayAvgGraphContainer>
    </Container>
  </>);
}

export default SensorEntryPage;