import { RouterModule, Routes } from '@angular/router';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { UserRegisterComponent } from './components/user-register/user-register.component';

const routes: Routes = [
  {path:'',redirectTo:'/auth/login',pathMatch:'full'},
  {
    path:'login',
    component:UserLoginComponent
  },
  {
    path:'register',
    component:UserRegisterComponent
  }
];

export const authRoutes = RouterModule.forChild(routes);
