import {Component, OnInit} from '@angular/core';
import {UsersService} from '../services/users.service';
import {ItemHistory} from '../entities/itemHistory';

@Component({
    selector: 'app-loginHistory',
    templateUrl: './login-history.component.html',
    styleUrls: ['./login-history.component.css']
})
export class LoginHistoryComponent implements OnInit {

    dataFromService = false;
    items: ItemHistory[] = [];

    constructor(private userService: UsersService) {}

    ngOnInit(): void {
        this.userService.getLoginHistory().subscribe(data => {
            if (data) {
                this.dataFromService = true;
                this.items = data;
            }

            console.log('login history ' + data);
            console.log(data);
            console.log('messages');
            console.log(this.items);
        });
    }
}
