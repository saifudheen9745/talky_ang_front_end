import { LocalStorageService } from './../../services/local-storage.service';
import { Component, OnInit, inject } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { ICreateRoomPaylod, IUserData } from '../../models/chat.model';
import { ChatService } from '../../services/chat.service';
import { CommonModule } from '@angular/common';
import { WebSocketService } from '../../services/web-socket.service';

@Component({
  standalone:true,
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss'],
  imports:[CommonModule]
})
export class ChatListComponent implements OnInit {

  private sharedService = inject(SharedService);
  public chatService = inject(ChatService);
  private localStorageService = inject(LocalStorageService);
  private webSocketService = inject(WebSocketService);

  ngOnInit() {
    this.chatService.getAllUsers();
  }

  listItemClick(user:IUserData){
    if(user.id !== this.sharedService.selectedChat.getValue().id){
      this.sharedService.toggleListAndChat.next({chat:true, list:true});
      const creatRoomPayload:ICreateRoomPaylod = {
        memberA:parseInt(user.id),
        memberB: parseInt(this.localStorageService.getItem("userId"))
      }
      this.chatService.getChatRoom(creatRoomPayload);
      this.sharedService.selectedChat.next(user);
      this.webSocketService.initializeWebSocketConnection();
    }
  }

}
