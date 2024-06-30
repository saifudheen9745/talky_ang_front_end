import { Component, OnInit } from '@angular/core';
import { ChatListComponent } from '../chat-list/chat-list.component';
import { ChatAreaComponent } from '../chat-area/chat-area.component';

@Component({
  standalone:true,
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  imports:[ChatListComponent, ChatAreaComponent]
})
export class ChatComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
