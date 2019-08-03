import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat-history',
  templateUrl: './chat-history.component.html',
  styleUrls: ['./chat-history.component.css']
})
export class ChatHistoryComponent implements OnInit {

  chatList = [];

  constructor(
    private chat: ChatService,
    private router: Router
  ) { }

  ngOnInit() {
    this.chat.getChatList()
      .subscribe((data) => {
        this.chatList = data;
      })
  }

  createRoom() {
    this.chat.createRoom((data: boolean) => {
      if(data) this.router.navigateByUrl('/home/chat')
    })
  }

  chatHistory(room: string) {
    this.router.navigateByUrl(`/home/chat?room=${room}`)
  }

}
