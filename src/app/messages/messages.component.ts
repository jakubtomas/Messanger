import {Component, OnInit} from '@angular/core';
import {UsersService} from "../services/users.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-messages',
    templateUrl: './messages.component.html',
    styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {


    public users: Array<any> = [];

    constructor(private userService: UsersService,
                /*private router: Router*/) {
    }

    ngOnInit(): void {


        //todo data save into the array users and show outside
        this.userService.getAllUsers().subscribe(allUsers => {
                console.log(allUsers);
                console.log("getAllUsers Observable" + allUsers);

                this.users = allUsers;

            }
        );


    }


    getMessage(user: any) {
        console.log(user);


        // take the name call subsribe function from service for messages
        // when are empty message notice send new message
        /// try to do this with asyn , observable

    }


}
