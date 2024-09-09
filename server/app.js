const express = require('express');
const cors = require('cors');
const { createServer } = require('node:http');
const mongoose = require('mongoose');
const { join } = require('node:path');
const app = express();
const server = createServer(app);
const { port, parser } = require('./service/serial');
const setupSocket = require('./service/socket');
const Archive = require('./Archive.js')

const DB_URL = `mongodb://localhost:27017/ControllerData`

// Middleware для обработки JSON
 app.use(cors());
app.use(express.json());

// Эндпоинт для получения задач
app.get('/archive', async (req, res) => {
  try {
      const tasks = await Archive.find(); // Получаем все задачи из коллекции
      res.json(tasks);
  } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
  }
});

app.post('/archive', async(req, res) => {
  try {
    const {number, status, date, time} = req.body
    const post = await Archive.create({number, status, date, time});
    res.json(post);
  } catch (error) {
    res.status(500).json(error);
  }
})

const io = setupSocket(server);

async function startApp() {
  try {
    await mongoose.connect(DB_URL);
    server.listen(8000, () =>  console.log('server running at http://localhost:8000'));
  } catch (error) {
    console.log(error);
  }
}

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

startApp();




