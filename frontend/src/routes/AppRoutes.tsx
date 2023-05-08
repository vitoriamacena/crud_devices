import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DeviceList from '../pages/DeviceList/DeviceList';
import CreateDevice from '../pages/CreateDevice/CreateDevice';
import EditDevide from '../pages/EditDevice/EditDevide';

const AppRoutes = () => {
  return (
      <Routes>
        <Route path='/' element={<DeviceList />}/>
        <Route path="/add" element={<CreateDevice />} />
        <Route path="/edit/:id" element={<EditDevide />} />
      </Routes>
  );
};

export default AppRoutes;