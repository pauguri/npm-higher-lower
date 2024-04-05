// const express = require('express');
// const { createServer } = require('http');
// const app = express();
// const cors = require('cors');
// app.use(cors());
// const httpServer = createServer(app);

const getRandomPackage = require('./get-random-npm-package');

const { Server } = require("socket.io");
const io = new Server(5000, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  }
});
console.log('listening on *:5000');

io.on('connection', (socket) => {
  console.log('a user connected');
  const packages = require('./packages.json');

  socket.on('get-package', (callback) => {
    const packageData = getRandomPackage(packages);
    callback(packageData);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

io.on('error', (err) => {
  console.log(err);
});