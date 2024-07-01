import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { IRegisterPayload } from '../../models/auth.model';

@Component({
  standalone:true,
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss'],
  imports:[ReactiveFormsModule]
})
export class UserRegisterComponent implements OnInit {

  private router = inject(Router);
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);

  registerFormError:boolean = false;

  registerForm = this.fb.group({
    name:['',Validators.required],
    email:['',Validators.required],
    password:['',Validators.required]
  })

  ngOnInit() {
  }

  navigateToRoute(route:string){
    this.router.navigate([route])
  }

  onRegisterSubmit(){
    this.registerForm.markAllAsTouched();
    if(this.registerForm.invalid){
      this.registerFormError = true;
      return;
    }
    this.authService.doRegister(this.registerForm.value as IRegisterPayload);
  }
}
