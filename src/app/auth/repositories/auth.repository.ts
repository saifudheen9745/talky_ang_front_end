import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { IApiRes, ILoginPayload, ILoginRes, IRegisterPayload, IRegisterRes } from "../models/auth.model";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn:'root'
})

export class AuthRepository {

  baseUrl = environment.baseUrl;

  private http = inject(HttpClient);

  login(loginData:ILoginPayload):Observable<IApiRes<ILoginRes[]>>{
    return this.http.post<IApiRes<ILoginRes[]>>(`${this.baseUrl}/user/auth/login`,loginData);
  }

  register(registerData:IRegisterPayload):Observable<IApiRes<IRegisterRes[]>>{
    return this.http.post<IApiRes<IRegisterRes[]>>(`${this.baseUrl}/user/auth/register`,registerData);
  }
}