import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-chat',
  templateUrl: './user-chat.component.html',
  styleUrls: ['./user-chat.component.css']
})
export class UserChatComponent implements OnInit {

  constructor(
    private chat: ChatService,
    private router: Router
    ) { }

  ngOnInit() {
  }

  createRoom() {
    this.chat.createRoom((data: boolean) => {
      if(data) this.router.navigateByUrl('/home/chat')
    })
  }

}
