import { motion } from "framer-motion";
import React, { useRef, useState } from "react";
import styled from "styled-components";
import SensorEntryGraph from "./SensorEntryGraph";

const TodayAvgGraphContainer = styled.div`
  display: flex;
  background-color: white;
  width: 1300px;
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

interface DummyData {
  data: {
    name: string;
    avg: number;
    score: number;
  }[];
  type: string;
}

const GraphSlider = ({ data, type }: DummyData) => {
  return (
    <TodayAvgGraphContainer>
      <TodayAvgGraphHeader>
        <h3>{`${type} Average`}</h3>
        <h4>{"평균 측정 값을 확인하세요."}</h4>
        <span>좌우로 드래그 가능</span>
      </TodayAvgGraphHeader>
      <TodayAvgGraph
        drag="x"
        dragConstraints={{ right: 0, left: -325 * (data.length - 4) }}
      >
        {data.map((data, index) => (
          <motion.div>
            <SensorEntryGraph
              key={index}
              name={data.name}
              avg={data.avg}
              score={data.score}
            />
          </motion.div>
        ))}
      </TodayAvgGraph>
    </TodayAvgGraphContainer>
  );
};

export default GraphSlider;
