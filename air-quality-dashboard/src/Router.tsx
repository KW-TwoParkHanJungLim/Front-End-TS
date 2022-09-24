import {BrowserRouter, Routes, Route} from 'react-router-dom';
import LoginPage from './pages/jiwoo/LoginPage';
import MainPage from './pages/jiwoo/MainPage';
import TimeGraph from './pages/jiwoo/TimeGraph';
import UserInfo from './pages/jiwoo/UserInfo';
import ExportPage from './pages/jiwoo/ExportPage';

const Router = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path='/' element={<LoginPage />}></Route>
        <Route path='/user/main' element={<MainPage />}></Route>
        <Route path='/user/graph' element={<TimeGraph />}></Route>
        <Route path='/user/info' element={<UserInfo />}></Route>
        <Route path='/user/export' element={<ExportPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;