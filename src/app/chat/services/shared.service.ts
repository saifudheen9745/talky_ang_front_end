import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IToggleListAndChat } from '../models/responsive.model';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  public toggleListAndChat = new BehaviorSubject<IToggleListAndChat>({} as IToggleListAndChat);

}
