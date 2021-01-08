import {Component, OnInit} from '@angular/core';
import {MyUser} from '../entities/user';
import {UsersService} from '../services/users.service';
import {MessageService} from "../services/message.service";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

    public user: MyUser = new MyUser('', '', '');

    constructor(private usersService: UsersService,
                private messageService: MessageService) {
    }

    ngOnInit(): void {
        this.getUser();
    }

    getUser(): void {
        this.usersService.getUser().subscribe(user => {
            this.user = new MyUser(
                user.fname,
                user.lname,
                user.login,
                user.password
            );
        });
    }

    updateUser(user: MyUser) {
        console.log("function updateUser profile component");

        this.usersService.editUser(user).subscribe(data => {
            console.log("data after edit user" + data);

            if (data) {
                this.usersService.user = user.login;
                this.getUser(); // refresh data in component
                this.messageService.sendMessage("Your profile information has been changed successfully!");
            } else {
                this.messageService.sendMessage("Your profile information not been changed successfully!");

            }
        })
        
    }

}
