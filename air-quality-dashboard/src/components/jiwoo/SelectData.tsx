import { Component } from 'react';

export default class SelectData extends Component {
  render() {
    return(
      <select name="공기질" className="select">
        <option selected> 전체 </option>
        <option value="1" onSelect={function() {
                
        }}>공기질1</option>
      </select>
    );
  } 
}
