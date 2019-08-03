import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  isDoctor: boolean = false
  username: string = ''

  constructor(
    private chat: ChatService,
    private router: Router) { }

  ngOnInit() {

  }

  setName(): void {
    if(this.username.length > 0) {
      let data = {username: this.username, isDoctor: this.isDoctor}
      this.chat.setUsername(data)
      sessionStorage.setItem('username', JSON.stringify(data))
      if(this.isDoctor)
        this.router.navigateByUrl('/doctor')
      else
        this.router.navigateByUrl('/home')
    }
  }

}
