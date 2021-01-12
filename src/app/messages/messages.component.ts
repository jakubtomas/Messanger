import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { Message } from '../entities/message';

@Component({
    selector: 'app-messages',
    templateUrl: './messages.component.html',
    styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  // TODO users that last messaged me or i messaged will be first in chats
  // TODO if many users or messages -> scroll (edit scrollbar css)

  constructor(private userService: UsersService) {}

  public users: Array<any> = [];
  public messages: Array<Message> = [];
  public user = '';
  public isClicked = '';
  message = new Message(this.userService.user, '', '', '');

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(allUsers => {
      this.users = allUsers;
    });
    this.user = this.userService.user;
  }

  getMessages(fromUser: any): void {
    this.message.to = fromUser;
    this.isClicked = fromUser;
    this.message.message = '';

    this.userService.getMessagesFromUser(fromUser).subscribe(messages => {
      this.messages = messages;
    });

    const element = document.getElementById('scrollTarget');
    if (element) {
      element.scrollIntoView({behavior: 'smooth', block: 'start'});
    }
  }

  printMessage(): string {
    return JSON.stringify(this.message);
  }

  onSubmitMessage(): void {
    if (this.message.message === '' || !this.message.to) {
      return;
    }
    this.userService.newMessage(this.message).subscribe(() => {
      this.getMessages(this.message.to);
      this.message = new Message(this.userService.user, '', this.message.to, '');
    });
  }
}
