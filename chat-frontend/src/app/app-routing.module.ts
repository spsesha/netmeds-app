import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from './components/signin/signin.component';
import { DoctorComponent } from './components/doctor/doctor.component';
import { UserChatComponent } from './components/user-chat/user-chat.component';
import { ChatWindowComponent } from './components/chat/chat-window/chat-window.component';
import { ChatHistoryComponent } from './components/chat/chat-history/chat-history.component';

const routes: Routes = [
  { path: 'signin', component: SigninComponent },
  { 
    path: 'doctor', 
    component: DoctorComponent,
    children: [
      { path: 'chat', component: ChatWindowComponent }
    ]
  },
  { 
    path: 'home', 
    component: UserChatComponent,
    children:[
      { path: 'chat', component: ChatWindowComponent },
      { path: '', component: ChatHistoryComponent }
    ]
  },
  { path: '', redirectTo: '/signin', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
