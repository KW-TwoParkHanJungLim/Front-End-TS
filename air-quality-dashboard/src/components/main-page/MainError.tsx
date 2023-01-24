import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Error = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 95vh;
  justify-content: center;
  align-items: center;
  span {
    font-size: 25px;
  }
`;

const Icon = styled(FontAwesomeIcon)`
  font-size: 60px;
  margin-bottom: 20px;
  opacity: 0.7;
`;

const MainError = () => {
  return (
    <Error>
      <Icon icon="frown-open" />
      <span>보유한 센서가 없거나 서비스가 불가합니다.</span>
    </Error>
  );
};

export default MainError;
