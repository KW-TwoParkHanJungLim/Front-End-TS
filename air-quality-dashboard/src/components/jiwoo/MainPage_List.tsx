import React, { Component } from 'react';
import MainPage_Sensor from './MainPage_Sensor';

export default class MainPage_List extends Component {
    render() {
      return(
        <div id="MainPage_List">
            <MainPage_Sensor></MainPage_Sensor>
            <MainPage_Sensor></MainPage_Sensor>
            
        </div>
      );
    }
  }
