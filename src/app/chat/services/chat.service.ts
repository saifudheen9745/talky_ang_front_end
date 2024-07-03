import { BehaviorSubject, Subscription } from 'rxjs';
import { Injectable, OnDestroy, OnInit, inject, signal } from "@angular/core";
import { ChatRepository } from "../repositories/chat.respository";
import { ICreateRoomPaylod, IUserData } from "../models/chat.model";
import { LocalStorageService } from './local-storage.service';
import { WebSocketService } from './web-socket.service';
import { SharedService } from './shared.service';

@Injectable({
  providedIn:'root'
})

export class ChatService implements OnDestroy{
  
  private chatRepo = inject(ChatRepository);
  private localStorageService = inject(LocalStorageService);
  private sharedService = inject(SharedService);

  private subscriptions:Subscription[] = [];
  public usersList = signal<IUserData[]>([]);
  public currentChatRoom = new BehaviorSubject<string>('');

  /**
   * @description This method will fetch all users registered on the site for chatting.
   * If the site is loading for the first time it will set the first user as selected for chatting.
   * If it is not the initial loading, we look for the previous selected user on the localstorage and set accordingly.
   */
  getAllUsers(){
    this.subscriptions.push(
      this.chatRepo.getAllUsers().subscribe({
        next:(res) => {
          if(res.success){
            this.usersList.set(res.data.filter(user => user.id.toString() !== this.localStorageService.getItem('userId')));
            if(!(this.localStorageService.getItem("selectedChat") as IUserData).id){
              this.sharedService.selectedChat.next(this.usersList()[0]);
              this.localStorageService.setItem("selectedChat",this.usersList()[0]);
            }
          }
        },
        error:(err) => {
          console.log(err);
        }
      })
    );
  }

  /**
   * @description Thsi method will fetch the roomId for a pair.
   * Once we received the roomId we will store it on loccalstorage
   * And invoke 'enterRoom' method in socket service to start listening for incoming messages in that room.
   * @param users data of members for room  creation
   */
  getChatRoom(users:ICreateRoomPaylod){
    this.subscriptions.push(
      this.chatRepo.createARoom(users).subscribe({
        next:(res) => {
          if(res.success){
            this.currentChatRoom.next(res.data[0].roomId);
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