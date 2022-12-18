import React, { useState } from 'react';
import styled from 'styled-components';

const Header = styled.h1`
  margin-bottom: 50px;
  font-weight: 700;
  font-size : 46px;
  color: #2c3e50;
  position : relative;
  span{
    z-index : 1;
    font-size : 35px;
    position : absolute;
    left : 20px;
    top : 110px;
    opacity : 0.5;
  }
`;

function UserInfo() {
    const [Inputs, setInputs] = useState({
        Name: '사용자',
        ID: 'user',
        PhoneNum: '01012345678',
        Email: 'user@gmail.com'
    });

    const { Name, ID, PhoneNum, Email } = Inputs;

    const handleChange = (e:any) => {
        const { value, name } = e.target;
        setInputs({
            ...Inputs,
            [name]: value
        });
    };
    
    const handleUpdate = (e:any) => {
        if(Name === '')
            alert("이름을 입력하세요.");
        else if(ID === '')
            alert("아이디를 입력하세요.");
        else if(PhoneNum === '')
            alert("올바른 형식의 전화번호를 입력하세요.");
        else if(Email === '')
            alert("이메일을 입력하세요.");
        else {
            alert("정보 수정 완료.");
            e.preventDefault();
            //DB에 넣는 코드 추가
        }
    }
    
    return(
        <div>
            <Header>내 프로필</Header>
            <h3 id="UserInfo">이름 &nbsp;&nbsp;&nbsp;<input type='text' name="Name" value={Name} className="InfoText" onChange={handleChange}></input><p /><br /></h3>
            <h3 id="UserInfo">아이디 <input type='text' name="ID" value={ID} className="InfoText" onChange={handleChange}></input><p /><br /></h3>
            <h3 id="UserInfo">연락처 <input type='text' name="PhoneNum" value={PhoneNum} className="InfoText" onChange={handleChange}></input><p /><br /></h3>
            <h3 id="UserInfo">이메일 <input type='text' name="Email" value={Email} className="InfoText" onChange={handleChange}></input><p /><br /></h3>
            <button value="update" id="UserInfo_Update" onClick={handleUpdate}>수정</button>
        </div>
    );
}

export default UserInfo;