import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IToggleListAndChat } from '../models/responsive.model';
import { IUserData } from '../models/chat.model';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  public toggleListAndChat = new BehaviorSubject<IToggleListAndChat>({} as IToggleListAndChat);
  public selectedChat = new BehaviorSubject<IUserData>({} as IUserData);

}
