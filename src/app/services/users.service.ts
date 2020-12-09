import {Injectable} from '@angular/core';
import {User} from "../entities/users";
import {Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";

/// anotacia ma sa tento servis brat do uvahz

@Injectable({
    providedIn: 'root'
})
export class UsersService {


    users = [new User("Petkoooo", "jano@jano.sk", 1),
        new User("Malko", "marienka@jano.sk", 2)];


    // private static users: Array;

// 53 minutes end
    constructor(private http: HttpClient) {
    }

    getUsersSynchronne(): User[] {
        return this.users;
    }

    getUsers(): Observable<User[]> {
        return of(this.users)
    }


}
