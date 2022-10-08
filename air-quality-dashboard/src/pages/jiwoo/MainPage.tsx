import React, { Component } from 'react';
import UpperPage from '../../components/jiwoo/UpperPage';
import SelectSensor from '../../components/jiwoo/SelectSensor';
import MainPageList from '../../components/jiwoo/MainPageList';

export default class MainPage extends Component {
    render() {
      return (
        <>
        <div className="MainPage">
          <UpperPage></UpperPage>
        </div>
        <MainPageList></MainPageList>
        </>
      );
    }
}
