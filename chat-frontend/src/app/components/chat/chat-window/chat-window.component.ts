import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css']
})
export class ChatWindowComponent implements OnInit, OnDestroy {

  chats = []
  message: string = '';
  isDisabled: boolean = false;
  chattingWith: boolean = false;
  constructor(
    private chat: ChatService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    let room = this.route.snapshot.queryParamMap.get('room');
    if(room) {
      this.chat.getChatHistory(room)
        .subscribe((data: any) => {
          this.chats = data.messages
          this.isDisabled = true;
        })
    } else {
      this.chat.getDoctorChat()
        .subscribe((data: any) => {
          this.chats.push(data)
          this.isDisabled = (data.type == 'leave')
          if(data.type == 'join')
            this.chattingWith = true
        })
    }
  }

  sendData() {
    let data = {username: 'self', message: this.message, type: 'msg'}
    this.chats.push(data)
    this.chat.sendDoctorChat(this.message)
    this.message = '';
  }

  leaveRoom() {
    if(this.chat.leaveRoom())
      this.router.navigateByUrl('/doctor')
    else
      this.router.navigateByUrl('/home')
  }
  
  ngOnDestroy() {
    this.chat.leaveRoom()
  }

}
