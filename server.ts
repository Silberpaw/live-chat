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

app.get('/', (_req, res) => {
res.send('Der Live-Chat-Server läuft!');
});

io.on('connection', (socket) => {
console.log('Ein Nutzer hat sich verbunden:', socket.id);

socket.on('chatMessage', (data: { username: string; text: string }) => {
console.log('Nachricht empfangen:', data);

const chatMessage = {
  username: data.username,
  text: data.text,
  time: new Date().toLocaleTimeString('de-DE')
};

io.emit('chatMessage', chatMessage);

console.log('Nachricht an alle Teilnehmer gesendet:', chatMessage);


});

socket.on(
  'chatMessage',
  (data: { username: string; text: string }) => {
console.log('Ein Nutzer hat die Verbindung getrennt.');
});
});

httpServer.listen(3000, () => {
console.log('Chat-Server läuft auf http://localhost:3000');
});
