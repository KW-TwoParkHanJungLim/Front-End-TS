import React from 'react';
import styled from "styled-components";
import ReactApexChart from "react-apexcharts";
import { getStatus } from "../../function/getStatus";
import { IAvgData } from "../../pages/SensorEntryPage";

const GraphWrapper = styled.div`
  display: flex;
  width: 325px;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: column;
  border-right: 1px solid rgba(0, 0, 0, 0.2);
  height: 100%;
  position: relative;
`;

const Header = styled.h4`
  font-weight: 700;
  text-align: center;
  font-size: 24px;
  margin-bottom: -10px;
  opacity: 0.7;
`;

const Footer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
  font-size: 28px;
  opacity: 0.7;
  span {
    font-size: 12px;
  }
`;

function SensorEntryGraph({
  name,
  avg,
  score,
  unit,
  weekAvg,
  weekScore,
  type,
}: IAvgData) {
  let state = getStatus(type === "Today" ? score : weekScore).state;
  let color = getStatus(type === "Today" ? score : weekScore).color;

  return (
    <GraphWrapper>
      <Header>{name}</Header>
      <ReactApexChart
        series={[type === "Today" ? score : weekScore]}
        type="radialBar"
        options={{
          chart: {
            toolbar: {
              show: false,
            },
          },
          colors: color,
          plotOptions: {
            radialBar: {
              startAngle: -135,
              endAngle: 135,
              dataLabels: {
                value: {
                  formatter: function (value: any) {
                    return value;
                  },
                  color: color[0],
                },
              },
            },
          },
          labels: state,
        }}
      />
      <Footer>
        {`${type === "Today" ? avg : weekAvg}`}
        <span>{unit}</span>
      </Footer>
    </GraphWrapper>
  );
}

export default SensorEntryGraph;
