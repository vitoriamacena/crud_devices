import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DeviceList from './pages/DeviceList';
import DeviceDetails from './pages/DeviceDetails';
import CreateDevice from './pages/CreateDevice';
import EditDevide from './pages/EditDevide';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<DeviceList />}/>
        <Route path="/add" element={<CreateDevice />} />
        <Route path="/edit/:id" element={<EditDevide />} />
        <Route path="/device/:id" element={<DeviceDetails />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;