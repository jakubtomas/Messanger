import {Component, OnInit} from '@angular/core';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';
import { Message } from '../entities/message';

@Component({
    selector: 'app-messages',
    templateUrl: './messages.component.html',
    styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  public users: Array<any> = [];
  public messages: Array<Message> = [];
  public user = '';

  constructor(private userService: UsersService) {}

  ngOnInit(): void {
    // todo data save into the array users and show outside
    this.userService.getAllUsers().subscribe(allUsers => {
      console.log('getAllUsers Observable' + allUsers);

      this.users = allUsers;
    });
    this.user = this.userService.user;
  }

  getMessages(fromUser: any): void {
    console.log('fromUser ' + fromUser);

    this.userService.getMessagesFromUser(fromUser).subscribe(messages => {
      this.messages = messages;
      console.log(this.messages);
    });
  }
}
