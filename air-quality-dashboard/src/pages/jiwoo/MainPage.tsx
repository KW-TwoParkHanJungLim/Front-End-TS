import React, { Component } from 'react';
import UpperPage from '../../components/jiwoo/UpperPage';
import SelectSensor from '../../components/jiwoo/SelectSensor';
import MainPage_List from '../../components/jiwoo/MainPage_List';

export default class MainPage extends Component {
    render() {
      return (
        <div className="MainPage">
          <UpperPage></UpperPage>
          <div id="MainPage_SelectSensor">
            <SelectSensor />
          </div>
          <MainPage_List></MainPage_List>
        </div>
      );
    }
}
