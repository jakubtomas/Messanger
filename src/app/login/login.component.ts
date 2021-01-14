import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';
import { Auth } from '../entities/auth';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    auth = new Auth();

    constructor(private userService: UsersService, private router: Router) {}

    ngOnInit(): void {}

    get printAuth(): string {
        return JSON.stringify(this.auth);
        // return null;
    }

    onSubmit(): void {

        this.userService.login(this.auth).subscribe();

    }
}
