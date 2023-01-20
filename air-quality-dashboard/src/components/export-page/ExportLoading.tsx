import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styled, { keyframes } from "styled-components";

const rotation = keyframes`
  from{
    transform: rotate(0deg);
  }
  to{
    transform: rotate(360deg);
  }
`;

const Loading = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  span {
    font-size: 30px;
    font-weight: 600;
    opacity: 0.7;
    margin-left: 10px;
  }
`;

const LoadingIcon = styled(FontAwesomeIcon)`
  font-size: 60px;
  margin-bottom: 10px;
  animation: ${rotation} 1s linear infinite;
  opacity: 0.7;
`;

const ExportLoading = () => {
  return (
    <Loading>
      <LoadingIcon icon="spinner" />
      <span>Loading...</span>
    </Loading>
  );
};

export default ExportLoading;
