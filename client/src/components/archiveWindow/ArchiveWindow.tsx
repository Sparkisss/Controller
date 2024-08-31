import { Layout } from "antd";
import { FC, useState, useEffect } from "react";
import { DeviceProps } from "../../style/styles";
const { Sider} = Layout;

const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false
  };

const ArchiveWindow:FC<DeviceProps> = ({data}) => {
    const [messages, setMessages] = useState<{ message: string; timestamp: string }[]>([]);
    const [num, setNum] = useState<number>(0) //состояние для отслеживания номера сообщения
    let newData = data?.split(" ").map(String);    
    // список возможных сообщений о состоягии объекта
    const getMessage = (event: string[]): string => { 
        for (let i = 0; i < event.length; i++) {
            if (event[7] === '1') return 'OK';
            if (event[8] === '1') return 'Attention';
            if (event[9] === '1') return 'Error';            
        }
        return ''       
    };
    // отслеживаем изменения сщстояния объекта и выводим дату изменения, сообщение о характере изменения,
    // порядковый номер изменения
    useEffect(() => {
        const timestamp = new Date().toLocaleString('en-GB', options); //дата изменения     
        const newMessage = newData ? getMessage(newData) : getMessage(['']); //характер изменения  
              
        setMessages((prevMessages) => { // формируем массив данных со всеми харрактеристиками
            if (prevMessages.length > 0 && prevMessages[prevMessages.length - 1].message === newMessage) {
              return prevMessages; // Если новое сообщение такое же, как последнее, не добавляем его
            }
            const updateMessage = [...prevMessages, { message: newMessage, timestamp }]
            if (updateMessage.length > 10) { 
                setNum(num + 1)
                updateMessage.shift();
            }
            return updateMessage //возвращаем сформированный массив
        });
    }, [data]);
    
    return (
        <Sider>
            <h3>Event archive:</h3>
            {messages.map((msg, index) => (                           
                <div key={index}>
                    {msg.message ? `${index + num}: ${msg.message}-${msg.timestamp}` : null}
                </div>
            ))}                   
        </Sider>
    );
};

export default ArchiveWindow;