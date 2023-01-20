import { useQuery } from "@tanstack/react-query";
import ReactApexChart from "react-apexcharts";
import styled from "styled-components";
import { getStatus } from "../../function/getStatus";
import { getUnit } from "../../function/getUnit";
import {
  scoreCo2,
  scoreHumi,
  scoreTemp,
  scoreTotal,
  scoreTvoc,
} from "../../function/scoreCalculate";

interface PreviewProps {
  name?: string;
  data?: {
    temp: number;
    humi: number;
    co2: number;
    tvoc: number;
    pm01: number;
    pm25: number;
    pm10: number;
  };
  logtime?: string;
  isLoading: boolean;
}

const Wrapper = styled.div`
  width: 325px;
  height: 450px;
  background-color: white;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  border-radius: 30px;
  margin-right: 30px;
  padding: 20px 25px;
`;

const Header = styled.h4`
  margin-bottom: 10px;
  font-weight: 700;
  font-size: 18px;
  display: flex;
  justify-content: center;
`;

const GraphContainer = styled.div`
  display: flex;
  height: 100px;
  width: 500px;
`;

const NoData = styled.div`
  width: 55%;
  display: flex;
  height: 350px;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 18px;
  opacity: 0.5;
`;

const GraphDescription = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 40px;
  margin-left: -50px;
  span {
    font-weight: 700;
    font-size: 20px;
    margin-bottom: 10px;
    color: #7f8c8d;
  }
`;

const AverageValueList = styled.ul`
  display: flex;
  flex-direction: column;
  margin-top: 40px;
`;

const AttributeName = styled.div`
  display: flex;
  span {
    font-size: 19px;
    margin-bottom: 5px;
    opacity: 0.6;
  }
`;

const AttributeValue = styled.div`
  display: flex;
  width: 80px;
  span {
    font-size: 18px;
  }
  div {
    margin-top: 4px;
    margin-left: 4px;
    font-size: 13px;
    font-weight: 800;
    opacity: 0.6;
    right: -5px;
  }
`;

const Attribute = styled.div`
  display: flex;
  justify-content: space-between;
  span {
    font-weight: 800;
  }
  margin-bottom: 10px;
`;

const StatusDot = styled.div<{ color: string }>`
  width: 12px;
  height: 12px;
  border-radius: 5px;
  background-color: ${(props) => props.color};
  margin-right: 6px;
  margin-top: 5px;
`;

const Loading = styled.div``;

function AttributePreview({ name, data, isLoading }: PreviewProps) {
  return (
    <Wrapper>
      <Header>{`${name}`}</Header>
      <GraphContainer>
        {name && data ? (
          <ReactApexChart
            width={180}
            series={[scoreTotal(data, 5)]}
            type="radialBar"
            options={{
              chart: {
                offsetX: -40,
              },
              colors: [
                function ({ value = 0 }) {
                  const color = getStatus(value).color[0];
                  return color;
                },
              ],
              plotOptions: {
                radialBar: {
                  hollow: {
                    size: "60%",
                  },
                  dataLabels: {
                    show: true,
                    name: {
                      show: false,
                    },
                    value: {
                      fontSize: "30px",
                      fontWeight: 700,
                      offsetY: 12,
                      formatter: function (val: any) {
                        return val;
                      },
                    },
                  },
                },
              },
              labels: ["Score"],
            }}
          />
        ) : (
          <NoData>센서 위에 마우스를 올려보세요</NoData>
        )}
        <GraphDescription>
          {name ? <span>공기질 상태</span> : null}
          {name && data ? (
            <span>{getStatus(scoreTotal(data, 5)).state[0]}</span>
          ) : null}
        </GraphDescription>
      </GraphContainer>
      {data ? (
        <AverageValueList>
          <Attribute>
            <AttributeName>
              <StatusDot color={getStatus(scoreTemp(data.temp, 5)).color[0]} />
              <span>{`Temperature `}</span>
            </AttributeName>
            <AttributeValue>
              <span>{`${data.temp}`}</span>
              <div>{`${getUnit("temp")}`}</div>
            </AttributeValue>
          </Attribute>
          <Attribute>
            <AttributeName>
              <StatusDot color={getStatus(scoreHumi(data.humi, 5)).color[0]} />
              <span>{`Humidity `}</span>
            </AttributeName>
            <AttributeValue>
              <span>{`${data.humi}`}</span>
              <div>{`${getUnit("humi")}`}</div>
            </AttributeValue>
          </Attribute>
          <Attribute>
            <AttributeName>
              <StatusDot color={getStatus(scoreCo2(data.co2)).color[0]} />
              <span>{`CO2 `}</span>
            </AttributeName>
            <AttributeValue>
              <span>{`${data.co2}`}</span>
              <div>{`${getUnit("co2")}`}</div>
            </AttributeValue>
          </Attribute>
          <Attribute>
            <AttributeName>
              <StatusDot color={getStatus(scoreTvoc(data.tvoc)).color[0]} />
              <span>{`TVOC `}</span>
            </AttributeName>
            <AttributeValue>
              <span>{`${data.tvoc}`}</span>
              <div>{`${getUnit("tvoc")}`}</div>
            </AttributeValue>
          </Attribute>
          <Attribute>
            <AttributeName>
              <StatusDot color={getStatus(scoreTvoc(data.pm01)).color[0]} />
              <span>{`PM1.0`}</span>
            </AttributeName>
            <AttributeValue>
              <span>{`${data.pm01 ?? "-"}`}</span>
              <div>{`${getUnit("pm01")}`}</div>
            </AttributeValue>
          </Attribute>
          <Attribute>
            <AttributeName>
              <StatusDot color={getStatus(scoreTvoc(data.pm25)).color[0]} />
              <span>{`PM2.5 `}</span>
            </AttributeName>
            <AttributeValue>
              <span>{`${data.pm25}`}</span>
              <div>{`${getUnit("pm25")}`}</div>
            </AttributeValue>
          </Attribute>
          <Attribute>
            <AttributeName>
              <StatusDot color={getStatus(scoreTvoc(data.pm10)).color[0]} />
              <span>{`PM10.0 `}</span>
            </AttributeName>
            <AttributeValue>
              <span>{`${data.pm25}`}</span>
              <div>{`${getUnit("pm10")}`}</div>
            </AttributeValue>
          </Attribute>
        </AverageValueList>
      ) : null}
    </Wrapper>
  );
}

export default AttributePreview;
