import { Pipe, PipeTransform } from '@angular/core';
import { IUserData } from '../chat/models/chat.model';

@Pipe({
  name: 'search',
  standalone:true
})
export class SearchPipe implements PipeTransform {

  transform(value: IUserData[], args: string): IUserData[] {

    if(!args.trim().length){
      return value;
    }

    return value.filter((user) => {
      if(JSON.stringify(user).includes(args)){
        return true;
      }else{
        return false;
      }
    })

  }

}
