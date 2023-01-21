import React, {useState} from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import TimeGraph from "./pages/TimeGraph";
import UserInfo from "./pages/UserInfoPage";
import ExportPage from "./pages/ExportPage";
import SensorEntryPage from "./pages/SensorEntryPage";
import AdminUserListPage from "./pages/AdminUserListPage";
import { CookiesProvider } from 'react-cookie'; //쿠키 관리

const Router = () => {
  return (
    <CookiesProvider> 
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route path="/" element={<LoginPage />}></Route>
          <Route path="/:user/main" element={<MainPage />}></Route>
          <Route path="/:user/:sensorId" element={<SensorEntryPage />}></Route>
          <Route path="/:user/graph" element={<TimeGraph />}></Route>
          <Route path="/:user/info" element={<UserInfo />}></Route>
          <Route path="/:user/export" element={<ExportPage />}></Route>
          <Route path="/:admin/userlist" element={<AdminUserListPage />}></Route>
          <Route path="/:admin/:user/main" element={<MainPage />}></Route>
          <Route path="/:admin/:user/:sensorId" element={<SensorEntryPage />}></Route>
          <Route path="/:admin/:user/graph" element={<TimeGraph />}></Route>
          <Route path="/:admin/:user/info" element={<UserInfo />}></Route>
          <Route path="/:admin/:user/export" element={<ExportPage />}></Route>
        </Routes>
      </BrowserRouter>
    </CookiesProvider>
  );
};

export default Router;
