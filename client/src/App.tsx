import LoginPage from './pages/LoginPage';
import DeviceDataPage from './pages/DeviceDataPage';
import ArchivePage from './pages/ArchivePage';
import SliderPage from './pages/SliderPage';
import TaskListPage from './pages/TaskListPage';
import HomePage from './pages/HomePage';
import RegistrationPage from './pages/RegistrationPage';
import { Routes, Route } from 'react-router-dom';
import NotFound from './pages/NotFound';
import './App.scss'
import { useSocketData } from './hooks/useSocketData';

function App() {
  const serverData = useSocketData();
  return (    
    <main className='wrapper'>
      <Routes>      
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/device" element={<DeviceDataPage data={serverData}/>} />
        <Route path="/archive" element={<ArchivePage />} />
        <Route path="/slider" element={<SliderPage />} />
        <Route path="/tasks" element={<TaskListPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
  )
}

export default App
