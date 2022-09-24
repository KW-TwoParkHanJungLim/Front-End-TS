import React, { Component } from 'react';
import UpperPage from '../../components/jiwoo/UpperPage';
import SelectData from '../../components/jiwoo/SelectData';
import Calendar from '../../components/jiwoo/Calendar';

export default class TimeGraph extends Component {
  render() {
    return (
      <div className="TimeGraph">
        <UpperPage></UpperPage>
        <div id="TimeGraph_GraphLayer">
          그래프
        </div>
        <div id="TimeGraph_BottomPage">
          <hr id="TimeGraph_B"></hr>
          <SelectData></SelectData><Calendar></Calendar>
          <div id="TimeGraph_SensorList">
            <h2 id="TimeGraph_S">센서 리스트</h2>
            <hr id="TimeGraph_S"></hr>
          </div>
        </div>
      </div>
    );
  }
}