import React, { Component } from "react";
import UpperPage from "../components/jiwoo/UpperPage";
import SelectData from "../components/jiwoo/SelectData";

export default class Main_Sensor extends Component {
  render() {
    return (
      <div className="MainPage">
        <UpperPage></UpperPage>
        <div id="MainPage_SelectSensor">
          <select name="센서" className="select">
            <option> 전체 </option>
            <option value="1" selected onSelect={function () {}}>
              센서1
            </option>
          </select>
        </div>
        <div id="MainPage_SensorPick">
          <SelectData />
          <div id="MainPage_DataPick">센서1에 대한 공기질 데이터입니다.</div>
        </div>
      </div>
    );
  }
}
