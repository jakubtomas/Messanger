import {Component, OnInit} from '@angular/core';
import {User} from "../entities/users";
import {UsersService} from "../services/users.service";

@Component({
    selector: 'app-users',// name , selector
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
    public value: string = 'value From users.Component ';

    users = [new User("Janko", "jano@jano.sk", 1),
        new User("Marienka", "marienka@jano.sk", 2)];
    selectedUser: User | undefined;

// chcem objekt   // davam komponent
    constructor(private usersService: UsersService) {

    }

    ngOnInit(): void { // tu posielam data , kvoli postupnosti
        // this.users = UsersService.getUsersSynchronne();
        // dostane userov zo servise
        // this.usersService.getUsers().subscribe(usersFromService => this.users = usersFromService);
    }

    selectUser(user: User) {
        this.selectedUser = user;
    }


}
