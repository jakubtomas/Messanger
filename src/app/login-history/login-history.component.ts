import {Component, OnInit} from '@angular/core';
import {UsersService} from "../services/users.service";
import {ItemHistory} from "../entities/itemHistory";

@Component({
    selector: 'loginHistory',
    templateUrl: './login-history.component.html',
    styleUrls: ['./login-history.component.css']
})
export class LoginHistoryComponent implements OnInit {

    dataFromService: boolean = false;
    items: ItemHistory[] = [];

    constructor(private userService: UsersService) {
        // this.messages.push("Hello");
    }

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


//      this.messages= [data]
        });
    }


}
