import axios from "axios";
    var data : any;
    const JWT_EXPIRY_TIME = 24*3600*1000; //만료시간 (24시간 millisec로 표현)
    //ID, PW를 보내면 accessToken과 refreshToken을 리턴한다.
    export const onLogin = ({ID, PW} : any) => {
      data = {ID, PW};
      axios.post('/login', data)
      .then(onLoginSuccess)
      .catch((error) => {

      });
    }
    //쿠키에 담긴 refreshToken이 자동으로 보내지면, 새로운 accessToken과 refreshToken을 리턴한다.
    //얘가 loginPage에만 있으면, 안되지 않나?? 항상 적용될 수 있어야 하지 않나??
    export const onSilentRefresh = () => {
      axios.post('/silent-refresh', data)
      .then(onLoginSuccess)
      .catch((error) => {

      });
    }
    //로그인 성공 시
    export const onLoginSuccess = (response : any) => {
      const {accessToken} = response.data;
      //API 요청하는 콜마다 헤더에 accssToken 담아 보내도록 설정
      axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
      //accessToken을 localStorage, cookie 등에 저장하지 않는다.
      //accessToken 만료되기 1분 전에 로그인 연장
      setTimeout(onSilentRefresh, JWT_EXPIRY_TIME - 60000);
    }