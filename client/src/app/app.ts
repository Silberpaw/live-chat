
import { Component, OnDestroy, ChangeDetectorRef, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { io, Socket } from 'socket.io-client';

interface ChatMessage {
  username: string;
  text: string;
  time: string;
}

interface ChatUser {
  id: string;
  username: string;
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
  private typingTimer: ReturnType<typeof setTimeout> | undefined;
  private isTyping = false;
  username = '';
  messageText = '';
  messages: ChatMessage[] = [];
  onlineUsers: ChatUser[] = [];
  typingUsers: string[] = [];
  connected = false;

  constructor() {
    this.socket = io('http://localhost:3000');

    this.socket.on('connect', () => {
      this.connected = true;

      if (this.username.trim()) {
        this.socket.emit('setUsername', this.username.trim());
      }

      this.changeDetector.markForCheck();
      console.log('Mit dem Chat-Server verbunden:', this.socket.id);
    });

      this.socket.on('userTyping', (data: { username: string; isTyping: boolean }) => {
        if (data.isTyping) {
          if (!this.typingUsers.includes(data.username)) {
            this.typingUsers.push(data.username);
          }
        } else {
          this.typingUsers = this.typingUsers.filter(
            name => name !== data.username
          );
        }

        this.changeDetector.markForCheck();
      });
    this.socket.on('connect_error', (error) => {
      this.connected = false;
      this.changeDetector.markForCheck();
      console.error('Verbindungsfehler:', error.message);
    });

    this.socket.on('disconnect', () => {
      this.connected = false;
      this.onlineUsers = [];
      this.changeDetector.markForCheck();
      console.log('Verbindung getrennt');
    });

    this.socket.on('chatMessage', (message: ChatMessage) => {
      this.messages.push(message);
      this.changeDetector.markForCheck();
    });

    this.socket.on('onlineUsers', (users: ChatUser[]) => {
      this.onlineUsers = users;
      this.changeDetector.markForCheck();
    });
  }

  onUsernameChange() {
    const username = this.username.trim();

    if (this.connected && username) {
      this.socket.emit('setUsername', username);
    }
  }

onMessageInput() {
  if (!this.connected || !this.username.trim()) {
    return;
  }

  if (!this.isTyping) {
    this.isTyping = true;
    this.socket.emit('typing', true);
  }

  if (this.typingTimer) {
    clearTimeout(this.typingTimer);
  }

  this.typingTimer = setTimeout(() => {
    this.isTyping = false;
    this.socket.emit('typing', false);
  }, 1200);
}

stopTyping() {
  if (this.typingTimer) {
    clearTimeout(this.typingTimer);
  }

  if (this.isTyping) {
    this.isTyping = false;
    this.socket.emit('typing', false);
  }
}
  sendMessage() {
    const username = this.username.trim();
    this.stopTyping();
    const text = this.messageText.trim();

    if (!username || !text || !this.connected) {
      return;
    }

    this.socket.emit('setUsername', username);
    this.socket.emit('chatMessage', { username, text });
    this.messageText = '';
  }

  
ngOnDestroy() {
  this.stopTyping();

  if (this.typingTimer) {
    clearTimeout(this.typingTimer);
  }

  this.socket.disconnect();
}
}