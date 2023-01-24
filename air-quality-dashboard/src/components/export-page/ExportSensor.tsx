import React from "react";
import styled from "styled-components";
import { getFace } from "../../function/getIcon";
import { getStatus } from "../../function/getStatus";
import { scoreTotal } from "../../function/scoreCalculate";

const Wrapper = styled.div<{ isHeader: boolean }>`
  display: grid;
  grid-template-columns: 1fr 1fr 5fr 4fr;
  gap: 20px;
  padding: 20px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  background-color: ${(props) =>
    props.isHeader ? "rgba(0,0,0,0.05)" : "white"};
  align-items: center;
  font-weight: ${(props) => (props.isHeader ? 600 : 500)};
  color: ${(props) => (props.isHeader ? "rgba(0,0,0,0.5)" : "black")};
  font-size: 20px;
`;

const Check = styled.div`
  justify-self: center;
`;

const Name = styled.div``;

const ID = styled.div``;

const Status = styled.div`
  justify-self: center;
  margin-right: 30px;
`;

interface IProp {
  isHeader?: boolean;
  data?: {
    sensorName: string;
    sensorId: string;
    logtime: string;
    airData: {
      temp: number;
      humi: number;
      co2: number;
      tvoc: number;
      pm01: number;
      pm25: number;
      pm10: number;
    };
  };
  isError?: boolean;
  sensorName?: string[];
  sensorId?: string[];
  setSensorName?: React.Dispatch<React.SetStateAction<string[]>>;
  setSensorId?: React.Dispatch<React.SetStateAction<string[]>>;
}

const StyledInput = styled.input`
  appearance: none;
  border: 1.5px solid rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  width: 20px;
  height: 20px;

  &:checked {
    border-color: transparent;
    background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
    background-size: 100% 100%;
    background-position: 50%;
    background-repeat: no-repeat;
    background-color: #63cdda;
  }

  &:hover {
    opacity: 0.5;
  }
`;

const CheckIcon = styled.div`
  border: 1.5px solid rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  width: 20px;
  height: 20px;
  border-color: transparent;
  background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
  background-size: 100% 100%;
  background-position: 50%;
  background-repeat: no-repeat;
  background-color: #63cdda;
`;

function ExportSensor ({
  isHeader = false,
  data,
  isError,
  setSensorName,
  setSensorId,
  sensorName,
  sensorId,
}: IProp) {
  const ret = getStatus(scoreTotal(data?.airData, 5));
  const state = ret.state[0];
  const color = ret.color[0];

  const onCheckboxClick = (name: string, id: string) => {
    if (sensorName && name && sensorId && setSensorName && setSensorId && id) {
      const newName = sensorName.slice();
      const newId = sensorId?.slice();
      if (newName.includes(name)) {
        const idx = newName.findIndex((v) => v === name);
        newName.splice(idx, 1);
        newId?.splice(idx, 1);
        setSensorId(newId);
        setSensorName(newName);
      } else {
        newName.push(name);
        newId.push(id);
        setSensorId(newId);
        setSensorName(newName);
      }
    }
  };

  return (
    <Wrapper isHeader={isHeader}>
      <Check>
        {isHeader ? (
          <CheckIcon />
        ) : data ? (
          <StyledInput
            type="checkbox"
            id={data.sensorId}
            name={data.sensorName}
            onClick={() => onCheckboxClick(data.sensorName, data.sensorId)}
          />
        ) : null}
      </Check>
      <Status>
        {isHeader ? "Status" : getFace(state, color, isError ?? true)}
      </Status>
      <Name>{isHeader ? "Device Name" : data?.sensorName}</Name>
      <ID>{isHeader ? "Device ID" : data?.sensorId}</ID>
    </Wrapper>
  );
};

export default ExportSensor;
