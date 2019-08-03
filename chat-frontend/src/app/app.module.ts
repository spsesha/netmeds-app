import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './components/signin/signin.component';
import { UserChatComponent } from './components/user-chat/user-chat.component';
import { DoctorComponent } from './components/doctor/doctor.component';
import { SharedModule } from './shared/shared.module';
import { ChatWindowComponent } from './components/chat/chat-window/chat-window.component';
import { ChatMessageComponent } from './components/chat/chat-message/chat-message.component';
import { ChatHistoryComponent } from './components/chat/chat-history/chat-history.component';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    UserChatComponent,
    DoctorComponent,
    ChatWindowComponent,
    ChatMessageComponent,
    ChatHistoryComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    SharedModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
