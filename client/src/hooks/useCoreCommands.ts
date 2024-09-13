import { useCallback, useState } from "react";
import { io } from "socket.io-client";
import { CoreCommand, SendParams } from "../style/styles";

const socket = io(import.meta.env.VITE_SERVER_PORT)

export const useCoreCommands = () => {
    const [coreCommands, setCoreCommands] = useState<CoreCommand[]>([
        { stand: '0', value: '0' }, // режим
        { stand: '1', value: '0' }, // насос 1
        { stand: '2', value: '0' }, // насос 2
    ]);    
    const send = useCallback(({mode, pump1, pump2}: SendParams) => {
        // Меняем значения coreCommands
        const newCoreCommands = coreCommands.map((command, index) => {
            const newValue = index === 0 ? mode ?? command.value :
                             index === 1 ? pump1 ?? command.value :
                             pump2 ?? command.value;
            return {...command, value: newValue};
        });
        //проверка на изменения
        if (JSON.stringify(coreCommands) !== JSON.stringify(newCoreCommands)) {
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
    }, [coreCommands]);
    return {coreCommands, send};
}
