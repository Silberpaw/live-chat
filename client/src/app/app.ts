import { Component, OnDestroy, ChangeDetectorRef, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { io, Socket } from 'socket.io-client';

interface ChatMessage {
username: string;
text: string;
time: string;
}

@Component({
selector: 'app-root',
standalone: true,
imports: [FormsModule],
templateUrl: './app.html',
styleUrl: './app.css'
})
export class App implements OnDestroy {
private socket: Socket;
private changeDetector = inject(ChangeDetectorRef);

username = '';
messageText = '';
messages: ChatMessage[] = [];
connected = false;

constructor() {
this.socket = io('http://localhost:3000');

this.socket.on('connect', () => {
  this.connected = true;
  this.changeDetector.markForCheck();
  console.log('Mit dem Chat-Server verbunden:', this.socket.id);
});

this.socket.on('connect_error', (error) => {
  this.connected = false;
  this.changeDetector.markForCheck();
  console.error('Verbindungsfehler:', error.message);
});

this.socket.on('disconnect', () => {
  this.connected = false;
  this.changeDetector.markForCheck();
  console.log('Verbindung getrennt');
});

this.socket.on('chatMessage', (message: ChatMessage) => {
  this.messages.push(message);
  this.changeDetector.markForCheck();

  console.log('Nachricht empfangen:', message);
});
}

sendMessage() {
  const username = this.username.trim();
  const text = this.messageText.trim();

  if (!username || !text || !this.connected) {
    return;
  }

  this.socket.emit('chatMessage', { username, text });
  this.messageText = '';
}

ngOnDestroy() {
this.socket.disconnect();
}
}
