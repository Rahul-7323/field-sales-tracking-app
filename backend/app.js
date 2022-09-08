require("dotenv").config();

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const HttpError = require('./utils/http-error');
const cors = require('cors');

const customerRoutes = require('./routes/customer.route');
const fieldAgentsRoutes = require('./routes/fieldAgent.route');
const supervisorRoutes = require('./routes/supervisor.route');

const newLocationHandler = require('./utils/newLocationHandler');

const app = express();
app.use(cors())

app.use(bodyParser.json());

app.use('/api/customer', customerRoutes);
app.use('/api/fieldAgent', fieldAgentsRoutes);
app.use('/api/supervisorRoutes', supervisorRoutes);

app.use((req, res, next) => {
  const error = new HttpError('Could not find this route.', 404);
  return next(error);
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ error: error.message || 'An unknown error has occured.' });
});

const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});
const port = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to mongoDB atlas database");
    io.on('connection', async (socket) => {
      console.log('new client connected');
      socket.emit('connection', null);

      socket.on('newLocation', data => {
        console.log(data);
        // newLocationHandler(data.agent_id, data.position);
      })
    });

    http.listen(port, () => {
      console.log(`Server started on port ${port}`);
    })
  })
  .catch((err) => {
    console.log(err);
  });