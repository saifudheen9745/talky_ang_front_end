import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  standalone:true,
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {

  private router = inject(Router);

  ngOnInit() {
  }

  navigateToRoute(route:string){
    this.router.navigate([route])
  }

}
