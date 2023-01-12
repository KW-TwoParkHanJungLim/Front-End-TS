import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import ReactDatePicker from "react-datepicker";
import styled from "styled-components";
import ChartAttribute from "./ChartAttribute";
import { ko } from "date-fns/esm/locale";
import { useQuery } from "@tanstack/react-query";
import { fetchGraph } from "../../api/api";

interface ChartProps {
  selectedSensors: string[];
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
  background-color: #ecf0f1;
  border-radius: 50px;
  margin-top: 50px;
`;

const SDatePicker = styled(ReactDatePicker)`
  padding: 20px 60px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  width: 360px;
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
  "HCHO",
  "TVOC",
  "LPG",
  "CO",
  "Smoke",
  "O3",
  `PM
  1.0`,
  `PM
  2.5`,
  `PM
  10.0`,
];

/*더미데이터*/
const tenMinutes = 600000;
const date = new Date("2010/07/24/00:00");
const timestamp = date.getTime();

function Chart(props: ChartProps) {
  const [selectedAttr, setSelectedAttr] = useState("Temperature");
  const [chartTitle, setChartTitlle] = useState("센서를 선택하세요");
  const [startDate, setStartDate] = useState(new Date());
  const datas: any[] = []; //더미데이터
  const { isLoading: graphLoading, data: graphData } = useQuery(
    ["graph", 567],
    fetchGraph
  );

  console.log(graphData);

  for (let i = 0; i <= 144; i++) {
    datas.push({
      x: timestamp + tenMinutes * i,
      y: i + 1,
    });
  }

  const onClickAttribute = (attr: string) => {
    setSelectedAttr(attr);
  };

  const titleFormatter = () => {
    let ret = "";

    if (props.selectedSensors.length === 0) {
      setChartTitlle("센서를 선택하세요");
      return;
    }

    for (let i = 0; i < props.selectedSensors.length; i++) {
      ret += ` | ${props.selectedSensors[i]}`;
    }
    setChartTitlle(ret);
  };

  useEffect(titleFormatter, [props.selectedSensors]);

  return (
    <Container>
      <Header>Time Line</Header>
      <SDatePicker
        selected={startDate}
        onChange={(date: Date) => setStartDate(date)}
        selectsStart
        dateFormat={" yyyy / MM / dd"}
        locale={ko}
      />
      <Wrapper>
        <AttributeList>
          {AttrList.map((attr, idx) => (
            <ChartAttribute
              onClick={() => onClickAttribute(attr)}
              name={attr}
              index={idx}
              isSelected={selectedAttr === attr}
            ></ChartAttribute>
          ))}
        </AttributeList>
        <ChartWrapper>
          <ReactApexChart
            width={"100%"}
            type="line"
            series={props.selectedSensors.map((sensor) => {
              return {
                name: sensor,
                data: datas,
              };
            })}
            options={{
              title: {
                text: `${chartTitle}`,
                align: "left",
                style: {
                  fontSize: "28px",
                },
              },
              subtitle: {
                text: `${selectedAttr}`,
                style: {
                  fontSize: "20px",
                  fontWeight: "bold",
                },
                offsetY: 40,
              },
              chart: {
                toolbar: {
                  show: false,
                },
              },
              grid: {
                borderColor: "rgba(0,0,0,0.4)",
              },
              xaxis: {
                type: "numeric",
                tooltip: {
                  enabled: false,
                },
                tickAmount: 12,
                labels: {
                  formatter: function (value: string) {
                    const v = parseInt(value);
                    const d = new Date(v);
                    return `${
                      d.getHours() >= 12 ? "오후" : "오전"
                    } ${d.getHours()}시`;
                  },
                  style: {
                    fontSize: "13px",
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
                    return `${value} 단위`;
                  },
                },
              },
              tooltip: {
                x: {
                  formatter: function (value: number) {
                    const date = new Date(value);
                    return date.toLocaleTimeString();
                  },
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
        </ChartWrapper>
      </Wrapper>
    </Container>
  );
}

export default Chart;
