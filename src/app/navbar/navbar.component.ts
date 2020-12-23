import {Component, OnInit} from '@angular/core';
import {UsersService} from "../services/users.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

    loggedUser: string = '';
    token: string = '';
    constructor(private usersService: UsersService) {
    }

    ngOnInit(): void {
        /*this.usersService.getUserObservable().subscribe(
            userName => this.loggedUser = userName
        );*/

        this.token = this.usersService.token
    }

    logout() {
        // this.usersService.logout();
    }

}
