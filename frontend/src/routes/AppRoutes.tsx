import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import DeviceList from '../pages/DeviceList/DeviceList';
import Loading from '../components/Loading/Loading';
const CreateDevice = lazy(() => import('../pages/CreateDevice/CreateDevice'));
const EditDevide = lazy(() => import('../pages/EditDevice/EditDevide'));

const AppRoutes = () => {
  return (
    <Suspense fallback={ <Loading />}>
      <Routes>
        <Route path='/' element={<DeviceList />}/>
        <Route path="/add" element={<CreateDevice />} />
        <Route path="/edit/:id" element={<EditDevide />} />
      </Routes>
      </Suspense>
  );
};

export default AppRoutes;