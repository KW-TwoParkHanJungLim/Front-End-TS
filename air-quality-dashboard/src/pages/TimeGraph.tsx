import React, { useState } from "react";
import styled from "styled-components";
import UpperPage from "../components/UpperPage";
import Chart from "../components/time-graph/Chart";
import ChartSensorList from "../components/time-graph/ChartSensorList";
import "react-datepicker/dist/react-datepicker.css";

const Container = styled.div`
  margin: 0 auto;
  padding-top: 130px;
  padding-left: 50px;
  height: 250vh;
  position: relative;
`;

function TimeGraph() {
  const [selectedSensor, setSelectedSensor] = useState<string[]>([]);
  const [selectedSensorId, setSelectedSensorId] = useState<string[]>([]);

  return (
    <>
      <div className="MainPage">
        <UpperPage />
      </div>
      <Container>
        <ChartSensorList
          selectedSensor={selectedSensor}
          setSelectedSensor={setSelectedSensor}
          selectedSensorId={selectedSensorId}
          setSelectedSensorId={setSelectedSensorId}
        />
        <Chart
          selectedSensors={selectedSensor}
          selectedSensorId={selectedSensorId}
        />
      </Container>
    </>
  );
}

export default TimeGraph;
