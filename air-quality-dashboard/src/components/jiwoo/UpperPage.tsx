import { Component } from 'react';
import '../../styles/Div.css';
import { Link } from 'react-router-dom';
import 로고 from '../../assets/images/로고.jpg';
import 로그아웃 from '../../assets/images/로그아웃.jpg';
import 회원정보 from '../../assets/images/회원정보.jpg';
import 엑셀 from '../../assets/images/엑셀.jpg';
import 그래프 from '../../assets/images/그래프.jpg';

export default class UpperPage extends Component {
    render() {
        return(
            <div className="HomeUpper">
              <Link to="/user/main"><img src={로고} id="로고" alt="logo"></img></Link>
              <Link to="/"><img src={로그아웃} id="우측상단" alt="logout"></img></Link>
              <Link to="/user/info"><img src={회원정보} id="우측상단" alt="user"></img></Link>
              <Link to="/user/export"><img src={엑셀} id="우측상단" alt="excel"></img></Link>
              <Link to="/user/graph"><img src={그래프} id="우측상단" alt="graph"></img></Link>
            </div>
        );   
    } 
}