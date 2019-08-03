import { Component, OnInit, Input, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.css']
})
export class ChatMessageComponent implements OnInit {

  @Input() data:  any;

  constructor() { }

  ngOnInit() {
  }

}
