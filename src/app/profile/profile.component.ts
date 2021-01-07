import {Component, OnInit} from '@angular/core';
import {MyUser} from '../entities/user';
import {UsersService} from '../services/users.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

    public user: MyUser = new MyUser('', '', '');

    constructor(private usersService: UsersService) {
    }

    ngOnInit(): void {
        this.usersService.getUser().subscribe(user => {
            this.user = new MyUser(
                user.fname,
                user.lname,
                user.login,
                user.password
            );
        });
    }

    editUser(): void {
        const tempUser = new MyUser('Miro', 'Test', this.user.login, this.user.password);
        this.usersService.editUser(tempUser).subscribe();
    }

}
