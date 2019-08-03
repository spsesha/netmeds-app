import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.css']
})
export class ChatMessageComponent implements OnInit {

  username = '';
  @Input() data:  any;

  constructor(
    private chat: ChatService
  ) { 
    this.username = this.chat.username
  }

  ngOnInit() {
  }

}
