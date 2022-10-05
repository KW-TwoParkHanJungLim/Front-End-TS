import {BrowserRouter, Routes, Route} from 'react-router-dom';
import LoginPage from './pages/jiwoo/LoginPage';
import MainPage from './pages/jiwoo/MainPage';
import Main_Sensor from './pages/jiwoo/Main_Sensor';
import Main_Data from './pages/jiwoo/Main_Data';
import TimeGraph from './pages/jiwoo/TimeGraph';
import UserInfo from './pages/jiwoo/UserInfo';
import ExportPage from './pages/jiwoo/ExportPage';

const Router = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path='/' element={<LoginPage />}></Route>
        <Route path='/user/main' element={<MainPage />}></Route>
        <Route path='/user/main/sensor' element={<Main_Sensor />}></Route>
        <Route path='/user/main/sensor/data' element={<Main_Data />}></Route>
        <Route path='/user/graph' element={<TimeGraph />}></Route>
        <Route path='/user/info' element={<UserInfo />}></Route>
        <Route path='/user/export' element={<ExportPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
