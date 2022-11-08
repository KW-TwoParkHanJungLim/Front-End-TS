import UpperPage from '../../components/jiwoo/UpperPage';
import { fetchCoins } from '../../api/api';
import { CoinInterface } from '../../components/jiwoo/MainPageList';
import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import React, { useState } from 'react';
import AttributePreview from '../../components/gunwoo/AttributePreiview';
import SensorSearch from '../../components/gunwoo/SensorSearch';
import Chart from '../../components/gunwoo/Chart';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from 'date-fns/esm/locale';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Container = styled.div`
  margin: 0 auto;
  padding-top: 130px;
  height: 200vh;
  position: relative;
  width: 80%;
`;

const Wrapper= styled.div`
  display:flex;
	margin : 50px auto;
	width: 100%;
`;

const Header = styled.h1`
  margin-bottom: 50px;
  font-weight: 700;
  font-size : 46px;
  color: #2c3e50;
  position : relative;
  span{
    z-index : 1;
    font-size : 35px;
    position : absolute;
    left : 20px;
    top : 110px;
    opacity : 0.5;
  }
`;
const Coin = styled.li<{match: boolean}>`
    background-color:  ${props=> props.match ? "#20c997" : "white"};
    color: ${props=> props.theme.textColor};
    font-weight: 600;
    border-radius: 10px;
    
  	display:flex;
    align-items: center;
  	padding: 20px;
  
    &:hover{    
       color: ${(props) => props.match ? "white": props.theme.accentColor};
    }
		cursor: pointer;
		height: 90px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space : nowrap;
		
`;

const CoinsList = styled.ul`
    display:grid;
    grid-template-columns : repeat(4, 1fr);
    @media screen and (max-width : 800px){
      grid-template-columns : repeat(1, 1fr);
    }
    @media screen and (max-width : 1150px) and (min-width : 800px){
      grid-template-columns : repeat(2, 1fr);
    }
    @media screen and (max-width : 1500px) and (min-width : 1150px){
      grid-template-columns : repeat(3, 1fr);
    }
    grid-template-rows : repeat(4, 1fr);
    gap: 10px;
    width: 100%;
		height: 400px;
		overflow: scroll;
		overflow-x:hidden;
		padding-right: 10px;

		&::-webkit-scrollbar {
			width: 8px;
			height: 8px;
			border-radius: 6px;
			background: rgba(255, 255, 255, 0.4);
		}
		&::-webkit-scrollbar-thumb {
			background: rgba(0, 0, 0, 0.3);
			border-radius: 6px;
		}
`;

const Img = styled.img`
    width: 25px;
    height: 25px;
    margin-right: 10px;
`;

const Notification = styled.span`
    position: absolute;
    right: 0px;
    color: tomato;
`;

const SDatePicker = styled(DatePicker)`
  padding: 20px 60px;
  border : 1px solid rgba(0,0,0,0.2);
  border-radius: 5px;
  width: 360px;
  font-size : 20px;
  color : rgba(0,0,0,0.5);
  &: focus{
    color: rgba(0,0,0,1);
  }
`;

function TimeGraph(){
  const {isLoading, data} = useQuery<CoinInterface[]>(["allCoins"], fetchCoins);
  const [selectedSensors, setselectedSensors] = useState<string[]>([]);
  const [previewId, setPreviewId] = useState("");
  const [search, setSearch] = useState("");
  const [startDate , setStartDate] = useState(new Date());

  const onChange = (e : React.FormEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value);
  };

  const filterTitle = data?.slice(0,50).filter((p) => {
    return p.name.toLocaleLowerCase().includes(search.toLocaleLowerCase());
  })


  const onCoinClicked = (coinId : string)=>{
    const newCoins = selectedSensors.slice();
    if(newCoins.includes(coinId)){
      const idx = newCoins.findIndex(item => item === coinId);
      newCoins.splice(idx, 1);
      setselectedSensors(newCoins);
    }else{
      if(newCoins.length >= 5){
        return;
      }
      newCoins.push(coinId);
      setselectedSensors(newCoins);
    }
  }

  const onMouseOverCoin = (name : string) => {
    setPreviewId(name);
  }
  return(
    <>
    <div className="MainPage">
          <UpperPage></UpperPage>
    </div>
    <Container>
      <Header>
          Sensor List
      </Header>
      <SensorSearch value={search} onChange = {onChange} />
      <Notification>{selectedSensors.length === 5 ? '최대 5개까지 선택 가능' : null}</Notification>
      <Wrapper>
        <AttributePreview name = {previewId}/>
        <CoinsList>
          {filterTitle?.slice(0,50).map(coin => 
          <Coin
            match = {selectedSensors.includes(coin.name)}
            key ={coin.id}
            onClick = {() => onCoinClicked(coin.name)}
            onMouseOver = {() => onMouseOverCoin(coin.name)}
          >
            <Img src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`} />
            {coin.name}							      
          </Coin>
        )}
        </CoinsList>
      </Wrapper>
      <Header>
          Time Line
          <span>
            <FontAwesomeIcon icon = 'chevron-down'/>
          </span>
      </Header>
      <SDatePicker 
      selected={startDate} 
      onChange = {(date : Date)  => setStartDate(date)} 
      selectsStart
      dateFormat={" yyyy / MM / dd"}
      locale = {ko}
      />
      <Chart selectedSensors = {selectedSensors}/>
    </Container>
    </>
  );
}

export default TimeGraph;