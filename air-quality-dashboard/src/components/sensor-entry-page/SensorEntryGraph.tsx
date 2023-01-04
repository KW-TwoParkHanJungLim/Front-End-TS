import ReactApexChart from "react-apexcharts";
import styled from "styled-components";

const GraphWrapper = styled.div`
  display: flex;
  width: 325px;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: column;
  border-right: 1px solid rgba(0, 0, 0, 0.2);
  height: 100%;
  position: relative;
`;

const Header = styled.h4`
  font-weight: 700;
  text-align: center;
  font-size: 24px;
  margin-bottom: -10px;
  opacity: 0.7;
`;

const Footer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
  font-size: 28px;
  opacity: 0.7;
`;

interface IData {
  name: string;
  avg: number;
  score: number;
}

function SensorEntryGraph({ name, avg, score }: IData) {
  let state;
  let color;

  if (score >= 70) {
    state = ["좋음"];
    color = ["#20c997"];
  } else if (score >= 40 && score < 70) {
    state = ["보통"];
    color = ["#f39c12"];
  } else {
    state = ["나쁨"];
    color = ["#e74c3c"];
  }
  return (
    <GraphWrapper>
      <Header>{name}</Header>
      <ReactApexChart
        series={[score]}
        type="radialBar"
        options={{
          chart: {
            toolbar: {
              show: false,
            },
          },
          colors: color,
          plotOptions: {
            radialBar: {
              startAngle: -135,
              endAngle: 135,
              dataLabels: {
                value: {
                  formatter: function (value: any) {
                    return value;
                  },
                  color: color[0],
                },
              },
            },
          },
          labels: state,
        }}
      />
      <Footer>{avg}</Footer>
    </GraphWrapper>
  );
}

export default SensorEntryGraph;
