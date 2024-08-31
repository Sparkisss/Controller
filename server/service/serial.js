const { SerialPort, ReadlineParser } = require('serialport');

const port = new SerialPort({
    path:'COM5',  
    baudRate: 9600,
    dataBits: 8,
    parity: 'none',
    stopBits: 1,
    flowControl: false
  }, function (err) {
    if (err) {
      return console.log("Error: ", err.message);
    }
  });
  //передача данных через сериал порт
  const parser = port.pipe(new ReadlineParser({ delimiter: '\n' }));

  module.exports = { port, parser };