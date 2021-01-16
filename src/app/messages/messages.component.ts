import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { Message } from '../entities/message';
import {MyUser} from '../entities/user';

@Component({
    selector: 'app-messages',
    templateUrl: './messages.component.html',
    styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  // TODO users that last messaged me or i messaged will be first in chats

  constructor(private userService: UsersService) {}

  public users: Array<any> = [];
  public objUsers: Array<MyUser> = [];
  public messages: Array<Message> = [];
  public user = '';
  public objUser = new MyUser('', '', '', '');
  public isClicked = '';
  message = new Message(this.userService.user, '', '', '');

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(allUsers => {
      this.users = allUsers;
    });
    this.userService.getLoggedUsers().subscribe(objUsers => {
      this.objUsers = objUsers;
    });
    this.user = this.userService.user;
  }

  getMessages(fromUser: MyUser): void {
    this.message.to = fromUser.login;
    this.isClicked = fromUser.login;
    this.objUser = fromUser;
    this.message.message = '';

    this.userService.getMessagesFromUser(fromUser.login).subscribe(messages => {
      this.messages = messages;
    });

    const element = document.getElementById('scrollTarget');
    if (element) {
      element.scrollIntoView({behavior: 'smooth', block: 'start'});
    }
  }

  onSubmitMessage(): void {
    if (this.message.message === '' || !this.message.to) {
      return;
    }
    this.userService.newMessage(this.message).subscribe(() => {
      const tempUser = new MyUser(this.objUser.fName, this.objUser.lName, this.message.to, '');
      this.getMessages(tempUser);
      this.message = new Message(this.userService.user, '', this.message.to, '');
    });
  }

  deleteMessage(message: Message): void {
    this.userService.deleteMessage(message).subscribe(() => {
      const tempUser = new MyUser(this.objUser.fName, this.objUser.lName, this.objUser.login, '');
      this.getMessages(tempUser);
    });
  }
}
