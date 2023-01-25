import React from "react";
import styled, { keyframes } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Loading = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 95vh;
  justify-content: center;
  align-items: center;
  span {
    font-size: 30px;
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
  font-size: 80px;
  margin-bottom: 10px;
  animation: ${rotation} 1s linear infinite;
`;

const MainLoading = () => {
  return (
    <Loading>
      <LoadingIcon icon="spinner" />
      <span>Loading...</span>
    </Loading>
  );
};

export default MainLoading;
