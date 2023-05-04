import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DeviceForm from './pages/DeviceForm';
import DeviceList from './pages/DeviceList';
import DeviceDetails from './pages/DeviceDetails';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<DeviceList />}/>
        <Route path="/add" element={<DeviceForm />} />
        <Route path="/edit/:id" element={<DeviceForm />} />
        <Route path="/device/:id" element={<DeviceDetails />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;