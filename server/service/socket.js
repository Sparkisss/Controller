const { Server } = require('socket.io');

const setupSocket = (server) => {
    const io = new Server(server, {
        cors: {
          origin: "http://localhost:5173", // Укажите домен вашего клиентского приложения
          methods: ["GET", "POST"]
        }
      });

      io.on('connection', (socket) => {
        console.log('Client has connected');
      
      // Обработка события 'LED_CONTROL' от клиента
      socket.on('LED_CONTROL', (data) => {
        // Отправляем данные на SerialPort
        const command = `${data.stand},${data.value};`; // Пример: "1,1;"
        port.write(command, (err) => {
            if (err) {
                console.error('Error sending data: ', err.message);
            } else {
                console.log('Data sent to SerialPort: ', command);
            }
        });
      });      
        // Обработка отключения клиента
        socket.on('disconnect', () => {
            console.log('Client has disconnected');
        });
      });

      return io;
}

module.exports = setupSocket;