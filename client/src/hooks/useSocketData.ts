import { useEffect, useState } from 'react';
import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_SERVER_PORT)

export const useSocketData = () => {
    const [serverData, setServerData] = useState<string>('');

    useEffect(() => {
        const handleData = (data: string) => {
            setServerData(data);
        };
  
        socket.on('data', handleData);
  
        return () => {
            socket.off('data', handleData);
        };
    }, []); 
    return serverData;
}