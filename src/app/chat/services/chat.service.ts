import { BehaviorSubject, Subscription } from 'rxjs';
import { Injectable, OnDestroy, OnInit, inject, signal } from "@angular/core";
import { ChatRepository } from "../repositories/chat.respository";
import { ICreateRoomPaylod, IUserData } from "../models/chat.model";
import { LocalStorageService } from './local-storage.service';
import { WebSocketService } from './web-socket.service';

@Injectable({
  providedIn:'root'
})

export class ChatService implements OnDestroy{
  
  private chatRepo = inject(ChatRepository);
  private localStorageService = inject(LocalStorageService);
  private webSocketService = inject(WebSocketService);

  private subscriptions:Subscription[] = [];
  public usersList = signal<IUserData[]>([]);
  public currentChatRoom = new BehaviorSubject<string>('');

  getAllUsers(){
    this.subscriptions.push(
      this.chatRepo.getAllUsers().subscribe({
        next:(res) => {
          if(res.success){
            this.usersList.set(res.data.filter(user => user.id.toString() !== this.localStorageService.getItem('userId')));
          }
        },
        error:(err) => {
          console.log(err);
        }
      })
    );
  }

  getChatRoom(users:ICreateRoomPaylod){
    this.subscriptions.push(
      this.chatRepo.createARoom(users).subscribe({
        next:(res) => {
          if(res.success){
            this.currentChatRoom.next(res.data[0].roomId);
            this.webSocketService.enterARoom(res.data[0].roomId);
          }
        },
        error:(err) => {
          console.log(err);
        }
      })
    );
  }
  
  ngOnDestroy(): void {
    this.subscriptions.forEach( sub => sub.unsubscribe());
  }

}