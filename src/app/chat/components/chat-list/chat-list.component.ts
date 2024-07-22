import { LocalStorageService } from './../../services/local-storage.service';
import { Component, inject } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { IUserData } from '../../models/chat.model';
import { ChatService } from '../../services/chat.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../../../shared/search.pipe';

@Component({
  standalone:true,
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss'],
  imports:[CommonModule, FormsModule, SearchPipe ]
})
export class ChatListComponent {

  public searchKey:string = '';

  public sharedService = inject(SharedService);
  public chatService = inject(ChatService);
  public localStorageService = inject(LocalStorageService);

  /**
   * @description 
   * @param user Userdata
   */
  listItemClick(user:IUserData){
    if(user.id !== this.sharedService.selectedChat.getValue().id){
      this.chatService.currentChatRoom.next('');
      this.localStorageService.setItem('selectedChat',user);
      this.sharedService.selectedChat.next(user);
    }
  }

}
