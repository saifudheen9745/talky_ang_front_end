import { Component, OnInit, inject } from '@angular/core';
import { ChatListComponent } from '../chat-list/chat-list.component';
import { ChatAreaComponent } from '../chat-area/chat-area.component';
import { SharedService } from '../../services/shared.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
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
  private chatService = inject(ChatService);

  subscriptions:Subscription[] = [];

  mode:'chat'|'list'|'both' = 'chat';

  ngOnInit() {
    this.chatService.getAllUsers();
  }

}
