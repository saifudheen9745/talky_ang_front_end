import { Component, OnInit, inject } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service';
import { Router } from '@angular/router';

@Component({
  standalone:true,
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  private localStorageService = inject(LocalStorageService);
  private router = inject(Router);

  ngOnInit() {
  }

  logout(){
    this.localStorageService.clearLocalStorage();
    this.router.navigate(['/auth/login']);
  }

}
