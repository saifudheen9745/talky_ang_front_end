// src/app/services/websocket.service.ts

import { Injectable, inject } from '@angular/core';
import { Client, IMessage, Message, StompSubscription } from '@stomp/stompjs';
import { IChatMessage, IChatMessageResponse } from '../models/chat.model';
import { ChatService } from './chat.service';
import { LocalStorageService } from './local-storage.service';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  public stompClient: Client;

  subscriptions:StompSubscription[] = [];
  roomsSubscribed:{[key:string]:StompSubscription} = {};

  private chatService = inject(ChatService);
  private localStorageService = inject(LocalStorageService);

  constructor() {
    this.initializeWebSocketConnection();
    this.localStorageService.setItem('rooms',{});
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
    if(this.roomsSubscribed[roomId]){
      console.log('Already subscribed with room',roomId);
      return;
    }
    this.subscriptions.push(
      this.stompClient.subscribe(`/room/${roomId}`, (message: Message) => {
        this.onMessageReceived(JSON.parse(message.body));
      })
    );
    if(!this.roomsSubscribed[roomId]){
      console.log('created new subscription with room',roomId);
      
      this.roomsSubscribed[roomId] = this.subscriptions[this.subscriptions.length - 1];
    }
  }

  onMessageReceived(message: IChatMessageResponse) {
    this.chatService.chatMessages.set([...this.chatService.chatMessages(),message]);
  }

  sendMessage(message: IChatMessage, roomId:string) {
    this.stompClient.publish({
      destination: `/app/chat/${roomId}/sendMessage`,
      body: JSON.stringify(message)
    });
  }
}
