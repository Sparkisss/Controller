import { useState, useEffect, useCallback } from 'react';
import { io } from "socket.io-client";
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

export type CoreCommand = {
  stand: string | number
  value: string | number
}

const socket = io("http://localhost:8000")

function App() {
  const [serverData, setServerData] = useState<string>('');
  const [coreCommands, setCoreCommands] = useState<CoreCommand[]>([
      { stand: '0', value: '0' }, // режим
      { stand: '1', value: '0' }, // насос 1
      { stand: '2', value: '0' }, // насос 2
  ]);

  useEffect(() => {
      const handleData = (data: string) => {
          setServerData(data);
      };

      socket.on('data', handleData);

      return () => {
          socket.off('data', handleData);
      };
  }, []); // Убедитесь, что socket не меняется

  const send = useCallback((mode: string, pump1: string, pump2: string) => {
      const newCoreCommands = [
          { stand: '0', value: mode },
          { stand: '1', value: pump1 },
          { stand: '2', value: pump2 },
      ];

      setCoreCommands(newCoreCommands);

      newCoreCommands.forEach((command) => {
          socket.emit('LED_CONTROL', command);
      });
  }, []);

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
