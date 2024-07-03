// src/app/services/websocket.service.ts

import { Injectable } from '@angular/core';
import { Client, Message } from '@stomp/stompjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  public stompClient: Client;

  constructor() {
    this.initializeWebSocketConnection();
  }

  initializeWebSocketConnection() {
    const webSocketUrl = 'ws://localhost:8080/ws';

    this.stompClient = new Client({
      brokerURL: webSocketUrl,
      connectHeaders: {
        
      },
      debug: (str) => {
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    this.stompClient.onConnect = (frame) => {
    };

    this.stompClient.onStompError = (frame) => {
      console.error('Broker reported error: ' + frame.headers['message']);
      console.error('Additional details: ' + frame.body);
    };

    this.stompClient.activate();
  }

  enterARoom(roomId:string){    
    console.log("listening for messages....")
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
