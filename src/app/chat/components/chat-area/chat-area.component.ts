import { Component, OnInit, inject } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { Subscription } from 'rxjs';
import { IUserData } from '../../models/chat.model';

@Component({
  standalone:true,
  selector: 'app-chat-area',
  templateUrl: './chat-area.component.html',
  styleUrls: ['./chat-area.component.scss']
})
export class ChatAreaComponent implements OnInit {

  private sharedService = inject(SharedService);

  subscriptions:Subscription[] = [];
  selectedUserToChat:IUserData = {} as IUserData;
  shortName:string = '';
  
  ngOnInit() {
    this.listenForListClick();
  }

  backButtonClick(){
    this.sharedService.toggleListAndChat.next({chat:false,list:true})
  }

  listenForListClick(){
    this.subscriptions.push(
      this.sharedService.toggleListAndChat.subscribe((res) => {
        if(res.data){
          this.selectedUserToChat = res.data;
        }
      })
    );
  }

}
