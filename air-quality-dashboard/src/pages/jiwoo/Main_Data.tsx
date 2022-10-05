import React, { Component } from 'react';
import UpperPage from '../../components/jiwoo/UpperPage';

export default class Main_Sensor extends Component {
    render() {
      return (
        <div className="MainPage">
          <UpperPage></UpperPage>
          <div id="MainPage_SelectSensor">
            <select name="센서" className="select">
              <option> 전체 </option>
              <option value="1" selected onSelect={function() {
                
              }}>센서1</option>
            </select>
          </div>
          <div id="MainPage_SensorPick">
            <select name="공기질" className="select">
                <option> 전체 </option>
                <option value="1" selected onSelect={function() {
                
                }}>공기질1</option>
            </select>
            <div id="MainPage_DataPick">
              센서1의 공기질1에 대한 1일 선그래프입니다.
            </div>
          </div>
        </div>
      );
    }
}
