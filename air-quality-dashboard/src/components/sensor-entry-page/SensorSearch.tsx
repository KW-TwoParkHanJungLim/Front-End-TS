import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Search = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const Icon = styled.span`
  position: absolute;
  left: 15px;
  opacity: 0.4;
`;

const Input = styled.input`
  padding: 20px 60px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  width: 330px;
  font-size: 20px;
`;

interface ISearchProp {
  search: string;
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
}

function SensorSearch({ search, onChange }: ISearchProp) {
  return (
    <Search>
      <Input
        type="text"
        value={search}
        onChange={onChange}
        placeholder="Search for Sensor"
      />
      <Icon>
        <FontAwesomeIcon icon="magnifying-glass" size="2x" />
      </Icon>
    </Search>
  );
}

export default SensorSearch;
