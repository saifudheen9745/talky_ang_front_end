import { Component, HostListener, OnInit, inject } from '@angular/core';
import { ChatListComponent } from '../chat-list/chat-list.component';
import { ChatAreaComponent } from '../chat-area/chat-area.component';
import { SharedService } from '../../services/shared.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { WebSocketService } from '../../services/web-socket.service';
import { ChatService } from '../../services/chat.service';

@Component({
  standalone:true,
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  imports:[CommonModule, ChatListComponent, ChatAreaComponent]
})
export class ChatComponent implements OnInit {

  private sharedService = inject(SharedService);
  private webSocketService = inject(WebSocketService);
  private chatService = inject(ChatService);

  @HostListener('window:resize',['$event'])
  onResize(){
    if(window.innerWidth > 768 && !(this.sharedService.toggleListAndChat.getValue().list && this.sharedService.toggleListAndChat.getValue().chat)){
      this.sharedService.toggleListAndChat.next({list:true,chat:true});
    }
  }

  subscriptions:Subscription[] = [];

  mode:'chat'|'list'|'both' = 'chat';

  ngOnInit() {
    if(window.innerWidth > 768){
      this.sharedService.toggleListAndChat.next({list:true,chat:true});
    }else{
      this.sharedService.toggleListAndChat.next({list:false,chat:true});
    }
    this.listenForListChatToggle();
    this.chatService.getAllUsers();
  }

  /**
   * @description This method subscribes to an obsrevable and helps in toggling between mobile and computer view.
   */
  listenForListChatToggle(){
    this.subscriptions.push(
      this.sharedService.toggleListAndChat.subscribe((res) => {
        if(res.chat && !res.list){
          this.mode = 'chat';
        }else if(!res.chat && res.list){
          this.mode = 'list';
        }else if(res.chat && res.list){
          this.mode = 'both';
        }
      })
    );
  }

}
