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
import { CoreCommand, SendParams, ArchiveData } from './style/styles';
import NotFound from './pages/NotFound';
import './App.scss'
import debounce from 'lodash/debounce';

const socket = io(import.meta.env.VITE_SERVER_PORT)

const options: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  hour12: false
};

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
  //////////////////
const [messages, setMessages] = useState<{ message: string; date: string }[]>([]);
const [num, setNum] = useState<number>(0) //состояние для отслеживания номера сообщения
const newData = serverData?.split(" ").map(String);    
// список возможных сообщений о состоягии объекта
const getMessage = (event: string[]): string => { 
    for (let i = 0; i < event.length; i++) {
        if (event[7] === '1') return 'OK';
        if (event[8] === '1') return 'Attention';
        if (event[9] === '1') return 'Error';            
    }
    return 'Load'       
};
// метод для записи данных в базу данных
const createArchiveMessage = async ({number, status, date}: ArchiveData) => {
  try {
      const response = await fetch('http://localhost:8000/archive', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({number, status, date})                
      });
      if (!response.ok) {
          throw new Error(`Ошибка: ${response.statusText}`);
      }
      const data = await response.json();
      console.log('Create: ', data);
  } catch (error) {
      console.log("Error with create data", error);
  }
}
  // отслеживаем изменения сщстояния объекта и выводим дату изменения, сообщение о характере изменения,
  // порядковый номер изменения
  const debouncedCreateArchiveMessage = debounce(createArchiveMessage, 300);

  useEffect(() => {
    const date = new Date().toLocaleString('en-GB', options);
    const status = newData ? getMessage(newData) : getMessage(['']);

    setMessages((prevMessages) => {
        if (prevMessages.length > 0 && prevMessages[prevMessages.length - 1].message === status) {
            return prevMessages;
        } else {
            const updateMessage = [...prevMessages, { message: status, date }];
            if (updateMessage.length > 10) {
                setNum(num + 1);
                updateMessage.shift();
            }
            const number = +(updateMessage.length + num);
            debouncedCreateArchiveMessage({ number, status, date });
            return updateMessage;
        }
    });
}, [serverData]);
  ////////////////

  return (    
    <main className='wrapper'>
      <Routes>      
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/device" element={<DeviceDataPage num={num} messages={messages} data={serverData} send={send}/>} />
        <Route path="/archive" element={<ArchivePage />} />
        <Route path="/slider" element={<SliderPage />} />
        <Route path="/tasks" element={<TaskListPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>

  )
}

export default App
