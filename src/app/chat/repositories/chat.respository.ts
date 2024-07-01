import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { IApiRes } from "../../auth/models/auth.model";
import { ICreateRoomPaylod, IUserData } from "../models/chat.model";

@Injectable({
  providedIn:'root'
})

export class ChatRepository {

  baseUrl = environment.baseUrl;

  private http = inject(HttpClient);

  getAllUsers():Observable<IApiRes<IUserData[]>>{
    return this.http.get<IApiRes<IUserData[]>>(`${this.baseUrl}/user/auth/users`);
  }

  createARoom(users:ICreateRoomPaylod):Observable<IApiRes<{roomId:string}[]>>{
    return this.http.post<IApiRes<{roomId:string}[]>>(`${this.baseUrl}/user/room`,users);
  }

}