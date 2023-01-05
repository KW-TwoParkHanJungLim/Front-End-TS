import React from "react";
import styled from "styled-components";

const SummaryBox = styled.div`
  display: grid;
  grid-template-columns: 3fr 2fr;
  border: 1px solid rgba(0, 0, 0, 0.2);
  padding: 20px;
  padding-bottom: 40px;
  span {
    font-size: 30px;
    line-height: 40px;
    font-weight: 700;
    opacity: 0.7;
  }
  &:hover {
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  }
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
`;

const SummaryEntry = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding-left: 70px;
  span {
    font-size: 30px;
    font-weight: 700;
    opacity: 0.8;
  }
`;

const Circle = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #20c997;
  margin-right: 20px;
`;

interface IProp {
  type: string;
  score: number;
}

const Summary = ({ type, score }: IProp) => {
  return (
    <SummaryBox>
      <span>{`Today ${type} Sensor Score`}</span>
      <SummaryEntry>
        <Circle />
        <span>{score}</span>
      </SummaryEntry>
    </SummaryBox>
  );
};

export default Summary;
