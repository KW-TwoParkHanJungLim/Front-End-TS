import React from "react";
import styled, { keyframes } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Loading = styled.div`
  display: flex;
  width: 70%;
  padding: 50px 0;
  justify-content: center;
  align-items: center;
  height: 700px;
  flex-direction: column;
  span {
    font-size: 30px;
    font-weight: 600;
    opacity: 0.7;
    margin-left: 10px;
  }
`;

const rotation = keyframes`
  from{
    transform: rotate(0deg);
  }
  to{
    transform: rotate(360deg);
  }
`;

const LoadingIcon = styled(FontAwesomeIcon)`
  font-size: 60px;
  margin-bottom: 10px;
  animation: ${rotation} 1s linear infinite;
  opacity: 0.7;
`;

interface IProp {
  selectedSensor: string[];
}

const ChartLoading = ({ selectedSensor }: IProp) => {
  return (
    <Loading>
      {selectedSensor.length > 0 ? (
        <>
          <LoadingIcon icon="spinner" />
          <span>Loading...</span>
        </>
      ) : (
        <span>센서를 선택하세요</span>
      )}
    </Loading>
  );
};

export default ChartLoading;
