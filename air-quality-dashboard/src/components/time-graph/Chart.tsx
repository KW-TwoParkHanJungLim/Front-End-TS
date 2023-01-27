import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactApexChart from "react-apexcharts";
import ReactDatePicker from "react-datepicker";
import styled from "styled-components";
import { ko } from "date-fns/esm/locale";
import { useQuery } from "@tanstack/react-query";
import { getUnit } from "../../function/getUnit";
import { getToday } from "../../pages/SensorEntryPage";
import { fetchGraph } from "../../api/api";
import ChartAttribute from "./ChartAttribute";
import ChartLoading from "./ChartLoading";
import ChartError from "./ChartError";

interface ChartProps {
  selectedSensors: string[];
  selectedSensorId: string[];
}

const Container = styled.div`
  width: 1700px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  margin-top: 56px;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  background-color: white;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 50px;
  margin-top: 50px;
`;

const SDatePicker = styled(ReactDatePicker)`
  padding: 20px 60px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  width: 330px;
  font-size: 20px;
  color: rgba(0, 0, 0, 0.5);
  &:focus {
    color: rgba(0, 0, 0, 1);
  }
`;

const AttributeList = styled.ul`
  width: 30%;
  display: grid;
  grid-template-columns: repeat(2, 200px);
  text-align: center;
  justify-items: center;
  justify-content: center;
`;
const Header = styled.h1`
  margin-bottom: 50px;
  font-weight: 700;
  font-size: 46px;
  color: #2c3e50;
  position: relative;
  span {
    z-index: 1;
    font-size: 35px;
    position: absolute;
    left: 20px;
    top: 110px;
    opacity: 0.5;
  }
`;

const ChartWrapper = styled.div`
  width: 70%;
  min-width: 500px;
  padding: 50px 0;
`;

const AttrList = [
  "Temperature",
  "Humidity",
  "CO2",
  "TVOC",
  `PM
  1.0`,
  `PM
  2.5`,
  `PM
  10.0`,
];

interface IGraph {
  s_id: string;
  logtime: string;
  value: number;
  avg?: number;
}

interface RouteParams {
  user: string;
}

function Chart({ selectedSensors, selectedSensorId }: ChartProps) {
  const [selectedAttr, setSelectedAttr] = useState("Temperature");
  const { user } = useParams<keyof RouteParams>() as RouteParams;
  const [startDate, setStartDate] = useState(new Date());
  const [datas, setDatas] = useState<any[][]>();
  const { isLoading, data, isError } = useQuery<IGraph[][]>(
    ["allSensors", selectedSensors, startDate, selectedAttr],
    () =>
      fetchGraph(
        user,
        getToday(startDate),
        selectedSensorId,
        selectedAttr
          .toLowerCase()
          .replace("1.0", "01")
          .replace(/[\s\.]/g, "")
          .substring(0, 4)
      ),
    {
      enabled: selectedSensors.length > 0,
    }
  );

  useEffect(() => {
    if (data && !isLoading && !isError) {
      const newDatas: any[][] = [];
      for (let i = 0; i < data.length; i++) {
        newDatas.push([]);
        for (let j = 0; j < data[i].length - 1; j++) {
          if (data[i][j].value) {
            const newData = {
              x: data[i][j].logtime,
              y: Number(data[i][j].value.toFixed(2)),
            };
            newDatas[i].push(newData);
          }
        }
      }
      setDatas(newDatas);
    } else if (isError) {
      setDatas(undefined);
    }
  }, [isLoading, selectedAttr, isError]);

  const onClickAttribute = (attr: string) => {
    setSelectedAttr(attr);
  };

  const titleFormatter = () => {
    let ret = "";

    if (selectedSensors.length === 0) {
      return;
    }

    for (let i = 0; i < selectedSensors.length; i++) {
      ret += ` | ${selectedSensors[i]}`;
    }
  };
  useEffect(titleFormatter, [selectedSensors]);

  return (
    <Container>
      <Header>Time Line</Header>
      <SDatePicker
        selected={startDate}
        onChange={(date: Date) => setStartDate(date)}
        selectsStart
        dateFormat={" yyyy / MM / dd"}
        locale={ko}
      ></SDatePicker>
      <Wrapper>
        <AttributeList>
          {AttrList.map((attr, idx) => (
            <ChartAttribute
              onClick={() => onClickAttribute(attr)}
              name={attr}
              index={idx}
              isSelected={selectedAttr === attr}
              key={attr}
            ></ChartAttribute>
          ))}
        </AttributeList>
        <ChartWrapper>
          {!isLoading && datas ? (
            <ReactApexChart
              width={"100%"}
              type="line"
              series={selectedSensors.map((sensor, index) => {
                if (datas[index]) {
                  return {
                    name: sensor,
                    data: datas[index],
                  };
                } else
                  return {
                    name: sensor,
                    data: [],
                  };
              })}
              options={{
                title: {
                  text: `${selectedAttr}`,
                  align: "left",
                  style: {
                    fontSize: "28px",
                  },
                },
                stroke: {
                  curve: "straight",
                  width: 4,
                },

                chart: {
                  toolbar: {
                    show: false,
                  },
                  zoom: {
                    enabled: false,
                  },
                  animations: {
                    enabled: false,
                  },
                },
                grid: {
                  borderColor: "rgba(0,0,0,0.4)",
                },
                xaxis: {
                  tooltip: {
                    enabled: false,
                  },
                  tickAmount: 12,
                  labels: {
                    style: {
                      fontSize: "13px",
                    },
                    formatter: function (value: string) {
                      if (typeof value === "string") {
                        return value.split("T")[1].split(".")[0];
                      }
                      return `${value}`;
                    },
                  },
                  axisTicks: {
                    color: "rgba(0,0,0,0.4)",
                  },
                },
                yaxis: {
                  labels: {
                    style: {
                      colors: "rgba(0,0,0,1)",
                      fontSize: "14px",
                    },
                    formatter: function (value: number) {
                      return `${value.toFixed(2)} ${getUnit(
                        selectedAttr
                          .toLowerCase()
                          .replace("1.0", "01")
                          .replace(/[\s\.]/g, "")
                          .substring(0, 4)
                      )}`;
                    },
                  },
                },
                tooltip: {
                  x: {
                    show: true,
                  },
                },

                legend: {
                  show: true,
                  position: "top",
                  horizontalAlign: "right",
                  offsetY: -40,
                  fontSize: "14px",
                },
              }}
            />
          ) : isError ? (
            <ChartError />
          ) : (
            <ChartLoading selectedSensor={selectedSensors} />
          )}
        </ChartWrapper>
      </Wrapper>
    </Container>
  );
}

export default Chart;
