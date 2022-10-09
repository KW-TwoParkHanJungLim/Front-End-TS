import { Component } from 'react';
import EachData from './EachData';

export default class MainPage_Sensor extends Component {
  render() {
    //EachData를 여러개 넣었을 때 오른쪽으로 이어서 나오도록 하고 싶음
    return(
      <div id="MainPage_Sensor">
        <div id="MainPage_SensorName">
          <h3>&nbsp;&nbsp;센서명</h3><p />
        </div>
        <div id="MainPage_SensorList">
          <EachData></EachData> &nbsp;
          <EachData></EachData> &nbsp;
        </div>
      </div>
    );
  }
}