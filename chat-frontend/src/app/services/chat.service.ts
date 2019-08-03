import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private url = 'http://localhost:3000'
  private socket
  private username: string
  public isDoctor: boolean
  private room: string

  constructor(
    private http: HttpClient
  ) { 
    this.socket = io(this.url)
    let data = sessionStorage.getItem('username')
    if(data) {
      let userData = JSON.parse(data)
      this.setUsername(userData)
      this.username = userData.username
      this.isDoctor = userData.isDoctor
    }
  }

  setUsername(data: any): void {
    this.username = data.username
    this.isDoctor = data.isDoctor
    this.socket.emit('set-username', data)
  }

  getDoctorChat(): Observable<string> {
    return Observable.create((observer) => {
      this.socket.on('doctor-chat', (message) => observer.next(message))
    })
  }

  sendDoctorChat(message: string): void {
    this.socket.emit('doctor-chat', {message: message, room: this.room})
  }

  getNewRequest(): Observable<any> {
    return Observable.create((observer) => {
      this.socket.on('new-request', (data) => observer.next(data))
    })
  }

  removeRequest(): Observable<any> {
    return Observable.create((observer) => {
      this.socket.on('remove-request', (data) => observer.next(data))
    })
  }

  createRoom(cb): void {
    let date = new Date()
    this.room = this.username + (date.toISOString())
    this.socket.emit('send-request', this.room, cb)
  }

  joinRoom(room, cb): void {
    this.socket.emit('join-room', room, cb);
  }

  leaveRoom(): boolean {
    this.socket.emit('leave-room')
    this.room = undefined
    return this.isDoctor
  }

  getChatList(): Observable<any> {
    return this.http.get(`/api/chat-list?username=${this.username}`)
  }

  getChatHistory(room): Observable<any> {
    return this.http.get(`/api/chat-history?room=${room}`)
  }

}
