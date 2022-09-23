import React, { Component } from 'react';
import UpperPage from '../../components/jiwoo/UpperPage';
import SelectSensor from '../../components/jiwoo/SelectSensor';
import SelectData from '../../components/jiwoo/SelectData';
import MainPage_Sensor from '../../components/jiwoo/MainPage_Sensor';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

export default class MainPage extends Component {
    render() {
      return (
        <div className="MainPage">
          <UpperPage></UpperPage>
          <div id="MainPage_SelectSensor">
            <SelectSensor></SelectSensor>
          </div>
          <div id="MainPage_List">
            <MainPage_Sensor></MainPage_Sensor>
            <MainPage_Sensor></MainPage_Sensor>
            {/*
                   <SelectData></SelectData>
            */}
          </div>
        </div>
      );
    }
}