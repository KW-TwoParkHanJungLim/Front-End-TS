import EachSensor from "../gunwoo/EachSensor";
import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import { fetchCoins } from '../../api/api';

const SensorList = styled.div`
  display: flex;
  flex-wrap : wrap;
  flex-direction: column;
  margin : 520px 200px;
  border : 5px solid black;
  padding : 20px 40px;
  width: 1000px;
  margin : 100px auto;
`

export interface CoinInterface{
  id: string,
  name: string,
  symbol: string,
  rank: number,
  is_new: boolean,
  is_active: boolean,
  type: string,
}

function MainPage_List(){
  const {data} = useQuery<CoinInterface[]>(["allCoins"], fetchCoins);
  return(
    <SensorList>
      {
        data?.slice(0,50).map(sensor =>
            <EachSensor key={sensor.id} sensor = {sensor}/>
      )}
    </SensorList>
  );
}

export default MainPage_List;