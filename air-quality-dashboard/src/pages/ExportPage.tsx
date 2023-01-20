import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useRef, useState } from "react";
import ReactDatePicker from "react-datepicker";
import { ko } from "date-fns/esm/locale";
import styled from "styled-components";
import { fetchGraphSensorList } from "../api/api";
import ExportLine from "../components/export-page/ExportLine";
import ExportSensor from "../components/export-page/ExportSensor";
import UpperPage from "../components/UpperPage";
import ExportLoading from "../components/export-page/ExportLoading";

const Container = styled.div`
  margin: 0 auto;
  padding-top: 150px;
  height: 100vh;
  position: relative;
  width: 1300px;
  margin-bottom: 100px;
`;

const SDatePicker = styled(ReactDatePicker)`
  padding: 20px 60px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  width: 360px;
  font-size: 20px;
  color: rgba(0, 0, 0, 0.5);
  &:focus {
    color: rgba(0, 0, 0, 1);
  }
  margin-bottom: 40px;
  margin-top: -20px;
`;

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

const SensorList = styled.div`
  width: 100%;
  height: 600px;
  border: 1px solid rgba(0, 0, 0, 0.2);
`;

export interface ISensor {
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

const ExportPage = () => {
  const [visible, setVisible] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const modalRef = useRef<HTMLDivElement>(null);
  const { isLoading, data, isError } = useQuery<ISensor[]>(
    ["allSensors", "axr-kotra"],
    () => fetchGraphSensorList("axr-inducwon")
  );
  const [sensorName, setSensorName] = useState<string[]>([]);
  const [sensorId, setSensorId] = useState<string[]>([]);

  const clickModalOutside = (e: any) => {
    if (modalRef.current && !modalRef.current.contains(e.target))
      setVisible(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", clickModalOutside);

    return () => {
      document.removeEventListener("mousedown", clickModalOutside);
    };
  });

  return (
    <div>
      <UpperPage />
      <Container>
        <Header>Data Export</Header>
        <SDatePicker
          selected={startDate}
          onChange={(date: Date) => setStartDate(date)}
          selectsStart
          dateFormat={" yyyy / MM / dd"}
          locale={ko}
        />
        <SensorList>
          <ExportSensor isHeader={true} />
          {isLoading ? (
            <ExportLoading />
          ) : (
            data?.map((v) => {
              return (
                <ExportSensor
                  key={v.sensorId}
                  data={v}
                  isError={isError}
                  setSensorName={setSensorName}
                  setSensorId={setSensorId}
                  sensorName={sensorName}
                  sensorId={sensorId}
                />
              );
            })
          )}
        </SensorList>

        <div ref={modalRef}>
          <ExportLine
            visible={visible}
            setVisible={setVisible}
            sensorName={sensorName}
            sensorId={sensorId}
            startDate={startDate}
          />
        </div>
      </Container>
    </div>
  );
};

export default ExportPage;
