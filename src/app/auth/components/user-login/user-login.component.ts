import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ILoginPayload } from '../../models/auth.model';

@Component({
  standalone:true,
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss'],
  imports:[ReactiveFormsModule]
})
export class UserLoginComponent implements OnInit {

  private router = inject(Router);
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);

  loginFormError:boolean = false;

  loginForm = this.fb.group({
    email:['',Validators.required],
    password:['',Validators.required]
  })

  ngOnInit() {
  }

  navigateToRoute(route:string){
    this.router.navigate([route])
  }

  onLoginSubmit(){
    this.loginForm.markAllAsTouched();
    if(this.loginForm.invalid){
      this.loginFormError = true;
      return;
    }
    this.authService.doLogin(this.loginForm.value as ILoginPayload);
  }

}
