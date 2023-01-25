import React from "react";
import styled, { keyframes } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
  font-weight: 600;
`;

const Error = styled.div`
  display: flex;
  flex-direction: column;
  opacity: 0.5;
`;

const Loading = styled.div`
  display: flex;
  flex-direction: column;
  opacity: 0.5;
`;

const rotation = keyframes`
  from{
    transform: rotate(0deg);
  }
  to{
    transform: rotate(360deg);
  }
`;

const Icon = styled(FontAwesomeIcon)`
  font-size: 60px;
  margin-bottom: 10px;
`;

const LoadingIcon = styled(FontAwesomeIcon)`
  font-size: 60px;
  margin-bottom: 10px;
  animation: ${rotation} 1s linear infinite;
`;

interface IProp {
  isLoading: boolean;
  isError: boolean;
}

function SensorEntryLoading ({ isError, isLoading }: IProp) {
  return (
    <Container>
      {isError ? (
        <Error>
          <Icon icon="frown-open" />
          <span>서버에 데이터가 없습니다</span>
        </Error>
      ) : isLoading ? (
        <Loading>
          <LoadingIcon icon="spinner" />
          <span>Loading...</span>
        </Loading>
      ) : null}
    </Container>
  );
};

export default SensorEntryLoading;
