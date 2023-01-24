import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { IAvgData } from "../../pages/SensorEntryPage";
import SensorEntryGraph from "./SensorEntryGraph";
import SensorEntryLoading from "./SensorEntryLoading";

const TodayAvgGraphContainer = styled.div`
  display: flex;
  background-color: white;
  width: 1300px;
  border-radius: 20px;
  flex-direction: column;
  height: 410px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  margin-bottom: 50px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
`;

const TodayAvgGraphHeader = styled.div`
  width: 100%;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  height: 140px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding: 20px;
  font-weight: 800;
  position: relative;
  h3 {
    font-size: 24px;
    margin-bottom: 15px;
    opacity: 0.7;
  }
  h4 {
    font-size: 20px;
    opacity: 0.5;
  }
  span {
    position: absolute;
    right: 10px;
    bottom: 10px;
    opacity: 0.5;
  }
`;

const TodayAvgGraph = styled(motion.div)`
  display: flex;
  height: 300px;
  flex-wrap: nowrap;
`;

export interface GraphData {
  data: IAvgData[];
  type: string;
  isLoading: boolean;
  isError: boolean;
}

function GraphSlider ({ data, type, isLoading, isError }: GraphData) {
  return (
    <TodayAvgGraphContainer>
      <TodayAvgGraphHeader>
        <h3>{`${type} Average`}</h3>
        <h4>{"평균 측정 값을 확인하세요."}</h4>
        <span>좌우로 드래그 가능</span>
      </TodayAvgGraphHeader>
      {isError || isLoading ? (
        <SensorEntryLoading isError={isError} isLoading={isLoading} />
      ) : (
        <TodayAvgGraph
          drag="x"
          dragConstraints={{ right: 0, left: -325 * (data.length - 4) }}
        >
          {data.map((data) => (
            <motion.div key={data.name}>
              <SensorEntryGraph
                key={data.name}
                name={data.name}
                avg={Number(data.avg.toFixed(2))}
                weekAvg={Number(data.weekAvg.toFixed(2))}
                weekScore={data.weekScore}
                score={data.score}
                unit={data.unit}
                type={type}
              />
            </motion.div>
          ))}
        </TodayAvgGraph>
      )}
    </TodayAvgGraphContainer>
  );
};

export default GraphSlider;
