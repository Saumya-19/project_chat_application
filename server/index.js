const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');

const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');

const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: process.env.NODE_ENV === 'production' 
      ? "https://your-production-domain.com" 
      : "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(router);

io.on('connect', (socket) => {
  console.log('New client connected:', socket.id);

  socket.on('join', ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });

    if(error) return callback(error);

    socket.join(user.room);

    socket.emit('message', { user: 'admin', text: `${user.name}, welcome to room ${user.room}.`});
    socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });

    io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

    callback();
  });

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);

    if(user) {
      io.to(user.room).emit('message', { user: user.name, text: message });
      
      // Stop typing indicator when message is sent
      socket.broadcast.to(user.room).emit('userStoppedTyping', user.name);
    }

    callback();
  });

  // Typing indicators
  socket.on('typing', () => {
    const user = getUser(socket.id);
    if(user) {
      socket.broadcast.to(user.room).emit('userTyping', user.name);
    }
  });

  socket.on('stopTyping', () => {
    const user = getUser(socket.id);
    if(user) {
      socket.broadcast.to(user.room).emit('userStoppedTyping', user.name);
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
    const user = removeUser(socket.id);

    if(user) {
      io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
      
      // Remove typing indicator if user was typing
      io.to(user.room).emit('userStoppedTyping', user.name);
    }
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server has started on port ${PORT}.`));