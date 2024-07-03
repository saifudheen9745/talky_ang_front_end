import { Component, OnDestroy, OnInit, computed, inject } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { Subscription } from 'rxjs';
import { IChatMessage, ICreateRoomPaylod, IUserData } from '../../models/chat.model';
import { LocalStorageService } from '../../services/local-storage.service';
import { ChatService } from '../../services/chat.service';
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
  public localStorageService = inject(LocalStorageService);
  public chatService = inject(ChatService);
  private webSocketService = inject(WebSocketService);

  subscriptions:Subscription[] = [];
  selectedUserToChat:IUserData = {} as IUserData;
  shortName:string = '';
  message:string;
  chatRoomId:string;
  
  ngOnInit() {
    this.setSelectedChatFromLocalStorage();
    this.listenForListClick();    
    this.listenForChatRommUpdate();
    setTimeout(() => {
      this.getRoomId();
    },200)
  }

  getRoomId(){
    const creatRoomPayload:ICreateRoomPaylod = {
      memberA:parseInt(this.selectedUserToChat.id),
      memberB: parseInt(this.localStorageService.getItem("userId"))
    }
    this.chatService.getChatRoom(creatRoomPayload);
  }

  listenForChatRommUpdate(){
    this.subscriptions.push(
      this.chatService.currentChatRoom.subscribe((res) => {
        if(this.webSocketService.stompClient.connected && res.length){
          this.webSocketService.enterARoom(res)
        }
      })
    );
  }

  backButtonClick(){
    this.sharedService.toggleListAndChat.next({chat:false,list:true})
  }

  setSelectedChatFromLocalStorage(){
    this.selectedUserToChat = this.localStorageService.getItem("selectedChat"); 
  }

  listenForListClick(){
    this.subscriptions.push(
      this.sharedService.selectedChat.subscribe((res) => {
        if(res?.id && (res?.id !== this.selectedUserToChat?.id)){
          this.localStorageService.setItem("selectedChat",res);
          this.selectedUserToChat = res;
          if(this.sharedService.toggleListAndChat.getValue().chat && this.sharedService.toggleListAndChat.getValue().list){
            this.getRoomId();
          }
        }
      })
    );
  }

  sendMessage(){
    const newMessage:IChatMessage = {
      date:Date.now(),
      msgFrom:this.localStorageService.getItem('userId'),
      msgTo:this.selectedUserToChat.id,
      message:this.message,
      room:this.chatService.currentChatRoom.getValue()
    }
    
    this.webSocketService.sendMessage(newMessage,this.chatService.currentChatRoom.getValue());
    this.message = ''
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach( sub => sub.unsubscribe());
  }

}
