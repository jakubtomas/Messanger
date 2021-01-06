import {Component, OnInit} from '@angular/core';
import {User} from "../entities/users";
import {MyUser} from "../entities/user";
import {UsersService} from "../services/users.service";

@Component({
    selector: 'app-user-edit',
    templateUrl: './user-edit.component.html',
    styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

    // vytvorim si prazdneho pouzivatela aby sa my mohli previazat data do tohto Usera

    //public  user: MyUserUser = new User("","");

    public user: MyUser = new MyUser('', '', '');

    constructor(private usersService: UsersService) {
    }

    ngOnInit(): void {

        //todo lepsie riesenie by bolo poslat sem data z rodica ako volat zase na server

        this.usersService.getUser().subscribe(user => {
            this.user = new MyUser(
                user.fname,
                user.lname,
                user.login,
                user.password
            );
        });
    }


    get vypisUser(): string {
        return JSON.stringify(this.user);
    }

    onSubmit() {
        // todo create api send data to user service and create function  updateProfile
    }
}
