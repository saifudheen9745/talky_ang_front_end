import { Component, OnInit, inject } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { IUserData } from '../../models/chat.model';

@Component({
  standalone:true,
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss']
})
export class ChatListComponent implements OnInit {

  private sharedService = inject(SharedService);

  ngOnInit() {
  }

  listItemClick(user:IUserData){
    this.sharedService.toggleListAndChat.next({chat:true, list:false, data:user});
  }

}
