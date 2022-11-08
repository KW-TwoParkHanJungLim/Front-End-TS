import ReactApexChart from "react-apexcharts";
import styled from "styled-components";


interface PreviewProps{
  name: string;
}

const Wrapper = styled.div`
  width: 325px;
  height: 400px;
  background-color: white;
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
  display:flex;
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

const AverageValue = styled.li`
  display:flex;
  justify-content: space-between;
  align-items: center;
`;

const AttributeName = styled.div`
  display:flex;
  align-items:center;
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


function AttributePreview(props : PreviewProps){
  return(
    <Wrapper>
      <Header>{`${props.name}`}</Header>
      <GraphContainer>
        <ReactApexChart
          width = {180}
          series={[70]}
          type = 'radialBar'
          options={{
            chart : {
              offsetX : -40,
            },
            plotOptions:{
              radialBar:{
                hollow:{
                  size: '60%',
                },
                dataLabels:{
                  show : true,
                  name:{
                    show : false,
                  },
                  value:{
                    fontSize: '30px',
                    fontWeight: 700,
                    formatter: function(val : any){
                      return val;
                    },
                  }
                }
              },
            },
            labels: ['Score'],       
          }}
        />
        <GraphDescription>
          <span>Sensor Score</span>
          <span>Good</span>
        </GraphDescription>
      </GraphContainer>
      <AverageValueList>
        <AverageValue>
          <AttributeName>
            <StatusDot/>
            <span>Temperature</span>
          </AttributeName>
          <AttributeValue>
            <span>36'C</span>
          </AttributeValue>
        </AverageValue>          
      </AverageValueList>
    </Wrapper>
  );
}

export default AttributePreview;