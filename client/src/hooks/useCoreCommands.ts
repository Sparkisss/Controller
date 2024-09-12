import { useState } from "react";
import { io } from "socket.io-client";
import { CoreCommand, SendParams } from "../style/styles";

const socket = io(import.meta.env.VITE_SERVER_PORT)

export const useCoreCommands = () => {
    const [coreCommands, setCoreCommands] = useState<CoreCommand[]>([
        { stand: '0', value: '0' }, // режим
        { stand: '1', value: '0' }, // насос 1
        { stand: '2', value: '0' }, // насос 2
    ]);
    
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
    return {coreCommands, send};
}
