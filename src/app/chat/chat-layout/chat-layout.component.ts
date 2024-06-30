import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { ChatListComponent } from '../components/chat-list/chat-list.component';
import { ChatAreaComponent } from '../components/chat-area/chat-area.component';
import { RouterOutlet } from '@angular/router';

@Component({
  standalone:true,
  selector: 'app-chat-layout',
  templateUrl: './chat-layout.component.html',
  styleUrls: ['./chat-layout.component.scss'],
  imports:[NavbarComponent, RouterOutlet]
})
export class ChatLayoutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
