import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  standalone:true,
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss']
})
export class UserRegisterComponent implements OnInit {

  private router = inject(Router);

  ngOnInit() {
  }

  navigateToRoute(route:string){
    this.router.navigate([route])
  }
}
