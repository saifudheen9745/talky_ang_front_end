import { Injectable, inject } from "@angular/core";
import { AuthRepository } from "../repositories/auth.repository";
import { ILoginPayload, IRegisterPayload } from "../models/auth.model";
import { Subscription } from "rxjs";
import { LocalStorageService } from "../../chat/services/local-storage.service";
import { Router } from "@angular/router";


@Injectable({
  providedIn:'root'
})

export class AuthService {

  private authRepo = inject(AuthRepository);
  private localStorageService = inject(LocalStorageService);
  private router = inject(Router);

  subscriptions:Subscription[] = []

  doLogin(loginData:ILoginPayload){
    this.subscriptions.push(
      this.authRepo.login(loginData).subscribe({
        next:(res) =>{
          if(res.success){
            this.localStorageService.setItem('userToken',res.data[0].token);
            this.localStorageService.setItem('userName',res.data[0].name);
            this.localStorageService.setItem('email',res.data[0].email);
            this.router.navigate(['/chat/index']);
          }
        },
        error:(err) => {
          console.log(err);
        }
      })
    );
  }

  doRegister(registerData:IRegisterPayload){
    this.subscriptions.push(
      this.authRepo.register(registerData).subscribe({
        next:(res) =>{
          if(res.success){
            this.router.navigate(['/auth/login']);
          }
        },
        error:(err) => {
          console.log(err);
        }
      })
    );
  }

}