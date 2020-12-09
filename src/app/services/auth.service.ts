import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SignupRequestPayload} from "../auth/signup/singup-request.payload";
import {Observable} from "rxjs";
import {RegistrationUser} from "../auth/signup/registrationUser";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    //signupRequestPayload: { fname: string; lname: string; password: string; login: string };
    //private signupRequestPayload: { password: string; email: string; username: string };

    constructor(private httpClient: HttpClient) {
        /*this.signupRequestPayload = {
          fname : 'new User from Agular',
          lname: 'Angular',
          login: 'user24',
          password: 'password123123'
        }*/
    }

    // todo change take data from signupcomponent
    signup(registrationUser: RegistrationUser) {
        // todo finished the post address

        //console.log(this.httpClient.post('localhost:8080/signup', registrationUser, {responseType: 'text'}));
        console.log("Auth.service");


        //return this.httpClient.post('localhost:8080/signup', registrationUser, {responseType: 'text'});

    }

}
