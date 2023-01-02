import UpperPage from "../components/UpperPage";
import styled from "styled-components";
import React, { useState } from "react";
import Chart from "../components/time-graph/Chart";
import "react-datepicker/dist/react-datepicker.css";
import ChartSensorList from "../components/time-graph/ChartSensorList";

const Container = styled.div`
  margin: 0 auto;
  padding-top: 130px;
  height: 250vh;
  position: relative;
`;

function TimeGraph() {
  const [selectedSensor, setSelectedSensor] = useState<string[]>([]);

  return (
    <>
      <div className="MainPage">
        <UpperPage></UpperPage>
      </div>
      <Container>
        <ChartSensorList
          selectedSensor={selectedSensor}
          setSelectedSensor={setSelectedSensor}
        />
        <Chart selectedSensors={selectedSensor} />
      </Container>
    </>
  );
}

export default TimeGraph;
