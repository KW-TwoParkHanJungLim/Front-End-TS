import { Component } from 'react';

export default class SelectSensor extends Component {
    render() {
      return(
        <select name="센서" className="select">
            <option selected> 전체 </option>
            <option value="1" onClick={function() {

            }}>센서1</option>
        </select>
      );
    }
}