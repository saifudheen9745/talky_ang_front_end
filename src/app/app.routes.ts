import { Routes } from '@angular/router';
import { LayoutComponent } from './auth/components/layout/layout.component';
import { ChatLayoutComponent } from './chat/chat-layout/chat-layout.component';

export const routes: Routes = [
  {path:'',redirectTo:'/auth',pathMatch:'full'},
  {
    path:"auth",
    component:LayoutComponent,
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
    children:[
      {
        path:'',
        loadChildren:() => import("./chat/chat.module").then(m => m.ChatModule)
      }
    ]
  }
];
