import {Component, Input, OnInit} from '@angular/core';
import {User} from "../entities/users";
import {MyUser} from "../entities/user";
import {UsersService} from "../services/users.service";
import {MessageService} from "../services/message.service";
import {EventEmitter, Output} from '@angular/core';

declare var $: any;

@Component({
    selector: 'app-user-edit',
    templateUrl: './user-edit.component.html',
    styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
    @Output('saved') saved$ = new EventEmitter<MyUser>();

    // vytvorim si prazdneho pouzivatela aby sa my mohli previazat data do tohto Usera

    //public  user: M
    //
    // yUserUser = new User("","");

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
            );
        });
    }


    get vypisUser(): string {
        return JSON.stringify(this.user);
    }

    onSubmit() {
        // this.user.fName = "new name";
        console.log("on submit user edit ");

        this.saved$.emit(this.user);
        $("#edit-user-modal").modal('hide');

    }
}
