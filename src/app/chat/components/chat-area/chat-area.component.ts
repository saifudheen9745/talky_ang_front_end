import { Component, OnDestroy, OnInit, computed, inject } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { Subscription, take } from 'rxjs';
import { IChatMessage, ICreateRoomPaylod, IUserData } from '../../models/chat.model';
import { LocalStorageService } from '../../services/local-storage.service';
import { ChatService } from '../../services/chat.service';
import { toObservable } from '@angular/core/rxjs-interop'
import { FormsModule } from '@angular/forms';
import { WebSocketService } from '../../services/web-socket.service';

@Component({
  standalone:true,
  selector: 'app-chat-area',
  templateUrl: './chat-area.component.html',
  styleUrls: ['./chat-area.component.scss'],
  imports:[FormsModule]
})
export class ChatAreaComponent implements OnInit, OnDestroy {

  private sharedService = inject(SharedService);
  private localStorageService = inject(LocalStorageService);
  private chatService = inject(ChatService);
  private webSocketService = inject(WebSocketService);

  subscriptions:Subscription[] = [];
  selectedUserToChat:IUserData = {} as IUserData;
  shortName:string = '';
  message:string;
  chatRoomId:string;

  constructor(){
    const userList$ = toObservable(this.chatService.usersList)
    userList$.pipe(take(2)).subscribe((res) => {
      const userId = this.localStorageService.getItem('selectedChat');
      if (userId) {
        this.selectedUserToChat = res.filter(user => user.id.toString() === userId.toString())[0];
        const creatRoomPayload:ICreateRoomPaylod = {
          memberA:parseInt(this.selectedUserToChat?.id),
          memberB: parseInt(this.localStorageService.getItem("userId"))
        }
        this.chatService.getChatRoom(creatRoomPayload);
      }
    });
  }
  
  ngOnInit() {
    this.listenForListClick();
    
  }

  backButtonClick(){
    this.sharedService.toggleListAndChat.next({chat:false,list:true})
  }

  listenForListClick(){
    this.subscriptions.push(
      this.sharedService.selectedChat.subscribe((res) => {
        if(res.id && res.id !== this.selectedUserToChat.id){
          
          this.localStorageService.setItem("selectedChat",res?.id);
          this.selectedUserToChat = res;
        }
      })
    );
  }

  sendMessage(){
    const newMessage:IChatMessage = {
      date:Date.now(),
      from:this.localStorageService.getItem('userId'),
      to:this.selectedUserToChat.id,
      message:this.message,
      room:this.chatService.currentChatRoom.getValue()
    }
    
    this.webSocketService.sendMessage(this.message,this.chatService.currentChatRoom.getValue());
    
  }

  ngOnDestroy(): void {
      this.subscriptions.forEach( sub => sub.unsubscribe());
  }

}
