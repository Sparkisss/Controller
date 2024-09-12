import { useState, useEffect } from "react";
import debounce from 'lodash/debounce';
import { createData } from '../API/api';
import { Message } from '../style/styles';

const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false
};

export const useGetMessage = (serverData: string | null) => {
    const [messages, setMessages] = useState<Message[]>([]);
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
    const debouncedCreateArchiveMessage = debounce(createData, 300);

      // отслеживаем изменения сщстояния объекта и выводим дату изменения, сообщение о характере изменения
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

    return { messages, num};
}

