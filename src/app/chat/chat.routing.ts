import { Routes, RouterModule } from '@angular/router';
import { ChatComponent } from './components/chat/chat.component';

const routes: Routes = [
  {path:'', redirectTo:'/chat/index',pathMatch:'full'},
  {path:'index',component:ChatComponent}
];

export const ChatRoutes = RouterModule.forChild(routes);
