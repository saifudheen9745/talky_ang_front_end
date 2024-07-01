import { Routes } from '@angular/router';
import { LayoutComponent } from './auth/components/layout/layout.component';
import { ChatLayoutComponent } from './chat/chat-layout/chat-layout.component';
import { AuthGuard } from './core/auth.guard';

export const routes: Routes = [
  {path:'',redirectTo:'/auth',pathMatch:'full'},
  {
    path:"auth",
    component:LayoutComponent,
    canActivateChild:[AuthGuard],
    data:{role:'checkIsLoggedIn'},
    children:[
      {
        path:'',
        loadChildren:() => import("./auth/auth.module").then(m => m.AuthModule)
      }
    ]
  },
  {
    path:"chat",
    component:ChatLayoutComponent,
    canActivateChild:[AuthGuard],
    children:[
      {
        path:'',
        loadChildren:() => import("./chat/chat.module").then(m => m.ChatModule)
      }
    ]
  }
];
