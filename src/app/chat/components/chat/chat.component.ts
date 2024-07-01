import { Component, HostListener, OnInit, inject } from '@angular/core';
import { ChatListComponent } from '../chat-list/chat-list.component';
import { ChatAreaComponent } from '../chat-area/chat-area.component';
import { SharedService } from '../../services/shared.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  standalone:true,
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  imports:[CommonModule, ChatListComponent, ChatAreaComponent]
})
export class ChatComponent implements OnInit {

  @HostListener('window:resize',['$event'])
  onResize(){
    if(window.innerWidth === 768){
      this.sharedService.toggleListAndChat.next({list:true,chat:true});
    }
  }

  private sharedService = inject(SharedService);

  subscriptions:Subscription[] = [];

  mode:'chat'|'list'|'both' = 'chat';

  ngOnInit() {
    if(window.innerWidth > 768){
      this.sharedService.toggleListAndChat.next({list:true,chat:true});
    }
    this.listenForListChatToggle();
  }

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
