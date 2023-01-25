import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { sensorlist } from "./MainPageList";
import SensorAttribute from "./SensorAttribute";
import { getStatus } from "../../function/getStatus";
import { getFace } from "../../function/getIcon";
import { getCookie } from "../../JWT/cookie";
import { scoreTotal } from "../../function/scoreCalculate";

const Sensor = styled.div`
  display: flex;
  width: 81%;
  flex-wrap: wrap;
  flex-direction: column;
  background-color: white;
  border: 3px solid rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  padding: 15px 20px;
  margin-bottom: 20px;
  box-shadow: 3px 3px #c5c5c5;
  overflow: hidden;
  position: relative;
  span {
    position: absolute;
    top: 24px;
    right: 26px;
  }
  margin: 0 auto;
  margin-bottom: 30px;
`;

const SensorAttributeWrapper = styled.div`
  display: flex;
  gap: 30px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  font-size: 24px;
  font-weight: 600;
`;

type MainProps = {
  UserId: string;
  unit: any;
  sensor: sensorlist;
};

const SensorScroll = styled(motion.div)`
  display: flex;
  height: 160px;
  flex-wrap: nowrap;
`;

function EachSensor({
  UserId,
  unit,
  sensor
}: MainProps): React.ReactElement {
  const statusRet = getStatus(scoreTotal(sensor.airData, 5));
  const Role = getCookie("role");
  const Id = getCookie("id");
  const getValues = Object.values(sensor.airData);
  var Data = [];
  var i;
  for (i = 0; i < 7; i++) {
    var values;
    if (getValues[i] == null) values = "-";
    else values = getValues[i];
    Data.push({ _name: unit[i].name, _value: values, _unit: unit[i].value });
  }

  var link: string;
  if (Role === "admin") link = `/${Id}/${UserId}/${sensor.sensorId}`;
  else link = `/${UserId}/${sensor.sensorId}`;
  return (
    <Sensor>
      <Header>
        {getFace(statusRet.state[0], statusRet.color[0], false)}
        {sensor.sensorName}&nbsp;&nbsp;
        <Link
          to={link}
          state={{
            sensorName: sensor.sensorName,
          }}
        >
          <FontAwesomeIcon icon="magnifying-glass" size="1x" />
        </Link>
      </Header>
      <span>좌우로 드래그 가능</span>
      <SensorAttributeWrapper>
        <SensorScroll
          drag="x"
          dragConstraints={{
            right: 0,
            left: -210 * (Object.values(sensor.airData).length - 5),
          }}
        >
          {Data.map((p: any) => (
            <motion.div>
              <SensorAttribute
                key={p._name}
                name={p._name}
                value={p._value}
                unit={p._unit}
              />
            </motion.div>
          ))}
        </SensorScroll>
      </SensorAttributeWrapper>
    </Sensor>
  );
}

export default EachSensor;
