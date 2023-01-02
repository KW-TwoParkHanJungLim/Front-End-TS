import { useQuery } from "@tanstack/react-query";
import ReactApexChart from "react-apexcharts";
import styled from "styled-components";

interface PreviewProps {
  name: string;
}

const Wrapper = styled.div`
  width: 325px;
  height: 400px;
  background-color: #ecf0f1;
  border-radius: 30px;
  margin-right: 30px;
  padding: 20px 25px;
`;

const Header = styled.h4`
  margin-bottom: 10px;
  font-weight: 700;
  font-size: 24px;
`;

const GraphContainer = styled.div`
  display: flex;
  height: 100px;
  width: 500px;
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

const AttributeValue = styled.div``;

const StatusDot = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: red;
  margin-right: 5px;
  margin-top: 2px;
`;

const Loading = styled.div``;

function AttributePreview(props: PreviewProps) {
  return (
    <Wrapper>
      <Header>{`${props.name}`}</Header>
      <GraphContainer>
        {props.name ? (
          <ReactApexChart
            width={180}
            series={[70]}
            type="radialBar"
            options={{
              chart: {
                offsetX: -40,
              },
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
        ) : null}
        <GraphDescription>
          {props.name ? <span>Sensor Score</span> : null}
          {props.name ? <span>Good</span> : null}
        </GraphDescription>
      </GraphContainer>
      <AverageValueList></AverageValueList>
    </Wrapper>
  );
}

export default AttributePreview;
