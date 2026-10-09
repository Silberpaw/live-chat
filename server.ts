
import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:4200'
  }
});

interface ChatUser {
  id: string;
  username: string;
}

const users = new Map<string, string>();

function getOnlineUsers(): ChatUser[] {
  return Array.from(users.entries()).map(([id, username]) => ({
    id,
    username
  }));
}

function sendOnlineUsers() {
  io.emit('onlineUsers', getOnlineUsers());
}

app.get('/', (_req, res) => {
  res.send('Der Live-Chat-Server läuft!');
});

io.on('connection', (socket) => {
  console.log('Ein Nutzer hat sich verbunden:', socket.id);

  socket.on('setUsername', (username: string) => {
    const cleanUsername = username.trim().slice(0, 30);

    if (!cleanUsername) {
      return;
    }

    users.set(socket.id, cleanUsername);
    sendOnlineUsers();

    console.log('Online:', cleanUsername);
  });

  
socket.on('typing', (isTyping: boolean) => {
  const username = users.get(socket.id);

  if (!username) {
    return;
  }

  socket.broadcast.emit('userTyping', {
    username,
    isTyping
  });
});
  socket.on('chatMessage', (data: { username: string; text: string }) => {
    const text = data.text.trim();
    const username = users.get(socket.id);

    if (!username || !text) {
      return;
    }

    const chatMessage = {
      username,
      text: text.slice(0, 2000),
      time: new Date().toLocaleTimeString('de-DE', {
        hour: '2-digit',
        minute: '2-digit'
      })
    };

    io.emit('chatMessage', chatMessage);
  });

  socket.on('disconnect', () => {
    const username = users.get(socket.id);

    users.delete(socket.id);
    sendOnlineUsers();

    if (username) {
      console.log('Offline:', username);
    }
  });
});

httpServer.listen(3000, () => {
  console.log('Chat-Server läuft auf http://localhost:3000');
});