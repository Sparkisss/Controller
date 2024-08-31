const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const app = express();
const server = createServer(app);
const { port, parser } = require('./service/serial');
const setupSocket = require('./service/socket');

app.get('/', (req, res) => {  
  app.use(express.static(__dirname + '/dist'));
  res.sendFile(join(__dirname, 'dist', 'index.html'));
});

const io = setupSocket(server);

server.listen(8000, () => {
  console.log('server running at http://localhost:8000');
});

port.write('main screen turn on', function(err) {
  if (err) {
    return console.log('Error on write: ', err.message)
  }
  console.log('message written')
})

parser.on('data', function (data) {   
  io.emit('data', data); 
  console.log('Data:', data.toString());  
})





