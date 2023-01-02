import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styled from "styled-components";

const Attribute = styled.li<{ isSelected: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 40%;
  span {
    font-weight: 600;
    margin-bottom: 5px;
  }
  margin-bottom: 10px;
  cursor: pointer;
  color: ${(props) => (props.isSelected ? "#20c997" : "rgba(0,0,0,0.5)")};
`;

const PM = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 25px;
  font-weight: 700;
  margin-bottom: -2.5px;
`;

interface IProp {
  isSelected: boolean;
  name: string;
  index: number;
  onClick: () => void;
}

interface Icon {
  iconNames:
    | "temperature-half"
    | "droplet"
    | "cloud"
    | "droplet-slash"
    | "biohazard"
    | "gas-pump"
    | "cloud-meatball"
    | "tornado"
    | "globe";
}

const iconNames: Icon["iconNames"][] = [
  "temperature-half",
  "droplet",
  "cloud",
  "droplet-slash",
  "biohazard",
  "gas-pump",
  "cloud-meatball",
  "tornado",
  "globe",
];

const ChartAttribute = ({ isSelected, name, onClick, index }: IProp) => {
  return (
    <Attribute isSelected={isSelected} onClick={onClick}>
      {index <= 8 ? (
        <FontAwesomeIcon icon={iconNames[index]} size="3x" />
      ) : (
        <PM>{name}</PM>
      )}
      <span>{name}</span>
      <span>AVG</span>
    </Attribute>
  );
};

export default ChartAttribute;
