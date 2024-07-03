import { LocalStorageService } from './../../services/local-storage.service';
import { Component, OnInit, inject } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { ICreateRoomPaylod, IUserData } from '../../models/chat.model';
import { ChatService } from '../../services/chat.service';
import { CommonModule } from '@angular/common';

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

  ngOnInit() {
    if(window.innerWidth > 768){
      this.sharedService.toggleListAndChat.next({list:true,chat:true});
    }else{
      this.sharedService.toggleListAndChat.next({list:true,chat:false});
    }
  }

  /**
   * @description 
   * @param user Userdata
   */
  listItemClick(user:IUserData){
    if((user.id !== this.sharedService.selectedChat.getValue().id) || (this.sharedService.toggleListAndChat.getValue().list && !this.sharedService.toggleListAndChat.getValue().chat)){
      if(window.innerWidth >= 768){
        this.sharedService.toggleListAndChat.next({chat:true, list:true});
      }else{
        this.sharedService.toggleListAndChat.next({chat:true, list:false});
      }
      this.chatService.currentChatRoom.next('');
      this.localStorageService.setItem('selectedChat',user);
      this.sharedService.selectedChat.next(user);
    }
  }

}
