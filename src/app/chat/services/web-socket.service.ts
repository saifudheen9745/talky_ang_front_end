// src/app/services/websocket.service.ts

import { Injectable } from '@angular/core';
import { Client, Message } from '@stomp/stompjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private stompClient: Client;

  constructor() {
    this.initializeWebSocketConnection();
  }

  initializeWebSocketConnection() {
    const webSocketUrl = 'ws://localhost:8080/ws';  // Replace with your WebSocket endpoint

    this.stompClient = new Client({
      brokerURL: webSocketUrl,
      connectHeaders: {
        // Optionally add headers here
      },
      debug: (str) => {
      },
      reconnectDelay: 5000,  // Automatically reconnect after 5 seconds
      heartbeatIncoming: 4000,  // Heartbeat every 4 seconds
      heartbeatOutgoing: 4000,  // Heartbeat every 4 seconds
    });

    // this.stompClient.onConnect = (frame) => {
    //   console.log('Connected: ' + frame);
    // };

    this.stompClient.onStompError = (frame) => {
      console.error('Broker reported error: ' + frame.headers['message']);
      console.error('Additional details: ' + frame.body);
    };

    this.stompClient.activate();
  }

  enterARoom(roomId:string){    
    this.stompClient.subscribe(`/room/${roomId}`, (message: Message) => {
      this.onMessageReceived(message);
    });
  }

  onMessageReceived(message: Message) {
    console.log('Received: ' + message.body);
  }

  sendMessage(message: string, roomId:string) {
    this.stompClient.publish({
      destination: `/app/chat/${roomId}/sendMessage`,
      body: message
    });
  }
}
