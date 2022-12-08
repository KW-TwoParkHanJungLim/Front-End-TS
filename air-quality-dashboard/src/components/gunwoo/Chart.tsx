import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import styled from "styled-components";

interface ChartProps {
  selectedSensors : string[];
}

const Wrapper= styled.div`
  display : flex;
  align-items: center;
  width: 100%;
  background-color: #ecf0f1;
  border-radius: 50px;
  margin-top: 50px;
  padding : 20px 0;
  @media screen and (max-width : 1370px){
    flex-direction: column;
    align-items: center;
  }
`;

const AttributeList = styled.ul`
  width: 30%;
  display: grid;
  grid-template-columns : repeat(2, 200px);
  text-align:center;
  justify-items:center;
  justify-content: center;
  @media screen and (max-width : 1370px){
    width : 100%;
    grid-template-columns : repeat(6, 1fr);
    grid-template-rows : repeat(2,150px);
    text-align : center;
    margin-top : 50px;
    
  }
`;

const Attribute = styled.li<{isSelected : boolean}>`
  display:flex;
  flex-direction: column;
  align-items: center;
  width: 40%;
  span{
    font-weight: 600;
    margin-bottom:5px;
  }
  margin-bottom: 10px;
  cursor: pointer;
  color : ${(props) => props.isSelected ? "#20c997" : "rgba(0,0,0,0.5)"};
`;

const PM = styled.div`
  font-size: 25px;
  font-weight: 700;
  margin-bottom: -2.5px;
`;

const ChartWrapper = styled.div`
  width: 70%;
  min-width : 500px;
  padding: 50px 0;
`;

/*더미데이터*/
const tenMinutes = 600000;
const date = new Date('2010/07/24/00:00');
const timestamp = date.getTime();

function Chart(props : ChartProps){
  const [selectedAttr, setSelectedAttr] = useState('Temperature');
  const [chartTitle, setChartTitlle] = useState('센서를 선택하세요');
  const datas : any[] = []; //더미데이터

  for(let i=0; i<=144; i++){
    datas.push({
      x : timestamp + tenMinutes * i,
      y : i+1,
    })
  }

  const onClickAttribute = (attr : string) => {
    setSelectedAttr(attr);
  };

  const titleFormatter = () =>{
    let ret  = '';

    if(props.selectedSensors.length === 0){
      setChartTitlle('센서를 선택하세요');
      return;
    }

    for(let i = 0; i<props.selectedSensors.length; i++){
      ret += ` | ${props.selectedSensors[i]}`;
    }
    setChartTitlle(ret);
  };

  useEffect(titleFormatter , [props.selectedSensors]);

  return (
  <Wrapper>
    <AttributeList>
      <Attribute onClick = {() => onClickAttribute('Temperature')} isSelected = {selectedAttr === 'Temperature'}>
        <FontAwesomeIcon icon = 'temperature-half' size = '3x'/>
        <span>Temperature</span>
        <span>36'C</span>
      </Attribute>
      <Attribute onClick = {() => onClickAttribute('Humidity')} isSelected = {selectedAttr === 'Humidity'}>
        <FontAwesomeIcon icon = 'droplet' size = '3x'/>
        <span>Humidity</span>
        <span>Average Value</span>
      </Attribute>
      <Attribute onClick = {() => onClickAttribute('CO2')} isSelected = {selectedAttr === 'CO2'}>
        <FontAwesomeIcon icon= 'cloud' size= '3x'/>
        <span>CO2</span>
        <span>Average Value</span>
      </Attribute>
      <Attribute onClick = {() => onClickAttribute('HCHO')} isSelected = {selectedAttr === 'HCHO'}>
        <FontAwesomeIcon icon= 'droplet-slash' size= '3x'/>
        <span>HCHO</span>
        <span>Average Value</span>
      </Attribute>
      <Attribute onClick = {() => onClickAttribute('TVOC')} isSelected = {selectedAttr === 'TVOC'}>
        <FontAwesomeIcon icon= 'biohazard' size= '3x'/>
        <span>TVOC</span>
        <span>Average Value</span>
      </Attribute>
      <Attribute onClick = {() => onClickAttribute('LPG')} isSelected = {selectedAttr === 'LPG'}>
        <FontAwesomeIcon icon= 'gas-pump' size= '3x'/>
        <span>LPG</span>
        <span>Average Value</span>
      </Attribute>
      <Attribute onClick = {() => onClickAttribute('CO')} isSelected = {selectedAttr === 'CO'}>
        <FontAwesomeIcon icon= 'cloud-meatball' size= '3x'/>
        <span>CO</span>
        <span>Average Value</span>
      </Attribute>
      <Attribute onClick = {() => onClickAttribute('Smoke')} isSelected = {selectedAttr === 'Smoke'}>
        <FontAwesomeIcon icon= 'tornado' size= '3x'/>
        <span>Smoke</span>
        <span>Average Value</span>
      </Attribute>
      <Attribute onClick = {() => onClickAttribute('O3')} isSelected = {selectedAttr === 'O3'}>
        <FontAwesomeIcon icon= 'globe' size= '3x'/>
        <span>O3</span>
        <span>Average Value</span>
      </Attribute>
      <Attribute onClick = {() => onClickAttribute('PM1.0')} isSelected = {selectedAttr === 'PM1.0'}>
        <PM>PM</PM>
        <PM>1.0</PM>
        <span>PM1.0</span>
        <span>Average Value</span>
      </Attribute>
      <Attribute onClick = {() => onClickAttribute('PM2.5')} isSelected = {selectedAttr === 'PM2.5'}>
        <PM>PM</PM>
        <PM>2.5</PM>
        <span>PM2.5</span>
        <span>Average Value</span>
      </Attribute>
      <Attribute onClick = {() => onClickAttribute('PM10')} isSelected = {selectedAttr === 'PM10'}>
        <PM>PM</PM>
        <PM>10</PM>
        <span>PM10</span>
        <span>Average Value</span>
      </Attribute>
    </AttributeList>
    <ChartWrapper>
    <ReactApexChart   
      width = {'100%'}
      type = "line"
      series={
        props.selectedSensors.map((sensor) =>{
          return {
            name : sensor,
            data : datas,
          }
        })
    }
      options={{
        title :{
          text : `${chartTitle}`,
          align: 'left',
          style : {
            fontSize : '28px',
          }
        },
        subtitle:{
          text : `${selectedAttr}`,
          style : {
            fontSize: '20px',
            fontWeight: 'bold',
          },
          offsetY : 40,
        },
        chart : {
          toolbar:{
            show: false,
          }
        },
        grid : {
          borderColor : 'rgba(0,0,0,0.4)',
        },
        xaxis :{
          type : "numeric",
          tooltip : {
            enabled : false,
          },
          tickAmount: 12,
          labels : {
            formatter : function(value: string){
              const v = parseInt(value);
              const d = new Date(v);
              return `${d.getHours()>=12 ? '오후' : '오전'} ${d.getHours()}시`;
            },
            style:{
              fontSize: '13px',
            },
            
          },
          axisTicks :{
            color: 'rgba(0,0,0,0.4)',
          },
        },
        yaxis:{
          labels:{
            style:{
              colors: 'rgba(0,0,0,1)',
              fontSize: '14px',
            },
            formatter : function(value : number){
              return `${value} 단위`;
            }
          }
        },
        tooltip : {
          x : {
            formatter: function(value : number){
                const date = new Date(value);
                return date.toLocaleTimeString();
            }
          }
        },
        legend:{
          show: true,
          position : 'top',
          horizontalAlign : 'right',
          offsetY : -40,
          fontSize: '14px',
        }
      }}
    />
    </ChartWrapper>
  </Wrapper>
  );
}

export default Chart;