import React, { Component } from 'react';
import styled from 'styled-components'
import UpperPage from '../../components/jiwoo/UpperPage';
import SelectSensor from '../../components/jiwoo/SelectSensor';
import Calendar from '../../components/jiwoo/Calendar';

export default class ExportPage extends Component {
    render() {
      return (
        <div className="ExportPage">
          <UpperPage></UpperPage>
          
          <div id="ExportPage_Main">
            <SelectSensor /><Calendar />
            <div id="ExportPage_File">
              <input type='file' className='FileSelect'></input><p /><br />
              <input type='button' value='저장' onClick={function() {

              }}></input>
            </div>  
          </div> 
        </div>
      );
    }
}
