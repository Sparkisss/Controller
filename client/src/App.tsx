import { useState, useEffect } from 'react';
import { io } from "socket.io-client";
import LoginPage from './pages/LoginPage';
import DeviceDataPage from './pages/DeviceDataPage';
import ArchivePage from './pages/ArchivePage';
import SliderPage from './pages/SliderPage';
import TaskListPage from './pages/TaskListPage';
import HomePage from './pages/HomePage';
import RegistrationPage from './pages/RegistrationPage';
import { Routes, Route } from 'react-router-dom';
import { CoreCommand, SendParams } from './style/styles';
import NotFound from './pages/NotFound';
import './App.scss'

const socket = io(import.meta.env.VITE_SERVER_PORT)

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

  const send = ({mode, pump1, pump2}: SendParams) => {
    // Меняем значения coreCommands
    const newCoreCommands: CoreCommand[] = [
      { stand: '0', value: mode ?? coreCommands[0].value },
      { stand: '1', value: pump1 ?? coreCommands[1].value },
      { stand: '2', value: pump2 ?? coreCommands[2].value },
  ];
    setCoreCommands(newCoreCommands);
    // Отправляем команды на сервер
    newCoreCommands.forEach((command) => {
      try {
          socket.emit('LED_CONTROL', command);
      } catch (error) {
          console.error('Error sending command:', error);
      }
  });       
}

  return (    
    <main className='wrapper'>
      <Routes>      
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/device" element={<DeviceDataPage data={serverData} send={send}/>} />
        <Route path="/archive" element={<ArchivePage />} />
        <Route path="/slider" element={<SliderPage />} />
        <Route path="/tasks" element={<TaskListPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>

  )
}

export default App
