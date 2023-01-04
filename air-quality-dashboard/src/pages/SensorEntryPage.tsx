import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import DatePicker from "react-datepicker";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { fetchCoinInfo, fetchCoins } from "../api/api";
import UpperPage from "../components/UpperPage";
import { ko } from "date-fns/esm/locale";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SensorEntryGraph from "../components/sensor-entry-page/SensorEntryGraph";
import Summary from "../components/sensor-entry-page/Summary";
import GraphSlider from "../components/sensor-entry-page/GraphSlider";

const Container = styled.div`
  margin: 0 auto;
  padding-top: 130px;
  height: 200vh;
  position: relative;
  width: 1300px;
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
    z-index: 1;
    font-size: 35px;
    position: absolute;
    left: 20px;
    top: 110px;
    opacity: 0.5;
  }
`;

const SDatePicker = styled(DatePicker)`
  padding: 20px 60px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  width: 360px;
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
  span {
    z-index: 1;
    font-size: 35px;
    position: absolute;
    left: 20px;
    top: 12px;
    opacity: 0.5;
  }
  padding-bottom: 50px;
  margin-bottom: 50px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
`;

function SensorEntryPage() {
  const { sensorId } = useParams<keyof RouteParams>() as RouteParams;
  const [startDate, setStartDate] = useState(new Date());
  const { isLoading: infoLoading, data: infoData } = useQuery<InfoInterface>(
    ["info", sensorId],
    () => fetchCoinInfo(sensorId)
  );
  const dummyData = [
    { name: "Temperature", avg: 36.5, score: 76.5 },
    { name: "Humidity", avg: 37.0, score: 47.2 },
    { name: "CO2", avg: 566.9, score: 81.2 },
    { name: "PM2.5", avg: 8.2, score: 71.2 },
    { name: "Whatever", avg: 9.2, score: 12.5 },
    { name: "Normal", avg: 4.1, score: 43.7 },
    { name: "CO2", avg: 566.9, score: 81.2 },
  ];

  return (
    <>
      <div className="MainPage">
        <UpperPage />
      </div>
      <Container>
        <Header>{infoData?.name}</Header>
        <Calendar>
          <span>
            <FontAwesomeIcon icon="chevron-down" />
          </span>
          <SDatePicker
            selected={startDate}
            onChange={(date: Date) => setStartDate(date)}
            selectsStart
            dateFormat={" yyyy / MM / dd"}
            locale={ko}
          />
        </Calendar>
        <SummaryContainer>
          <Summary type="Today" score={71.3} />
          <Summary type="Average" score={71.3} />
        </SummaryContainer>
        <GraphSlider data={dummyData} type="Today" />
        <GraphSlider data={dummyData} type="Week" />
      </Container>
    </>
  );
}

export default SensorEntryPage;
