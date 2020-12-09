import {Component, OnInit} from '@angular/core';
import {UsersService} from "../services/users.service";
import {Router} from "@angular/router";
import {Auth} from "../entities/auth";

@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

    auth = new Auth();
    printAuth: any;


    constructor(private userService: UsersService,
                private router: Router) {
    }

    ngOnInit(): void {
    }

    changeName($event: KeyboardEvent) {

    }

    onSubmit() {

    }
}
