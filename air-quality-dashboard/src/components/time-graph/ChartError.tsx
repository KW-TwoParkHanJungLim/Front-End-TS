import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Container = styled.div`
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

const Icon = styled(FontAwesomeIcon)`
  font-size: 60px;
  margin-bottom: 10px;
  opacity: 0.7;
`;

const ChartError = () => {
  return (
    <Container>
      <Icon icon="frown-open" />
      <span>서버에 데이터가 없습니다</span>
    </Container>
  );
};

export default ChartError;
