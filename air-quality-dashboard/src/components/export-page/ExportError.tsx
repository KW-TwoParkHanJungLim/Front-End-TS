import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Error = styled.div`
  display: flex;
  width: 100%;
  height: 90%;
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

const Icon = styled(FontAwesomeIcon)`
  font-size: 60px;
  margin-bottom: 20px;
  opacity: 0.7;
`;

function ExportError() {
  return (
    <Error>
      <Icon icon="frown-open" />
      <span>보유한 센서가 없거나 서비스가 불가합니다.</span>
    </Error>
  );
};

export default ExportError;
