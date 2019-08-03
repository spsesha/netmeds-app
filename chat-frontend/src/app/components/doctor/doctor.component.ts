import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {

  requests = []
  requestDisplay: boolean = true;

  constructor(
    private chat: ChatService,
    private router: Router
  ) { }

  ngOnInit() {
    this.router.events
      .subscribe((event) => {
        if(event instanceof NavigationEnd) {
          if (event.url === '/doctor') this.requestDisplay = true
          else this.requestDisplay = false
        }
      })
    this.chat.getNewRequest()
      .subscribe((request) => {
        this.requests.push(request)
      })
    this.chat.removeRequest()
      .subscribe((data) => {
        let req = this.requests.findIndex(x => x.room == data.room)
        if(req >= 0)
          this.requests.splice(req, 1)
      })
  }

  rejectRequest(index: number) {
    this.requests.splice(index, 1)
  }

  acceptRequest(index: number) {
    this.chat.joinRoom(this.requests[index].room, () =>{
      this.requests.splice(index, 1)
      this.router.navigateByUrl('/doctor/chat')
      this.requestDisplay = false;
    })
  }

}
