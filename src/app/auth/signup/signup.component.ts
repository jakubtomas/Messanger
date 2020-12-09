import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {UsersService} from "../../services/users.service";
import {SignupRequestPayload} from "./singup-request.payload";
import {RegistrationUser} from "./registrationUser";
import {AuthService} from '../../services/auth.service';

@Component({
    selector: 'signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

    signupRequestPayload: SignupRequestPayload | undefined;
    //private signupForm: FormGroup;
    //signupForm: FormGroup | undefined;
    // private registrationUser: RegistrationUser;

    constructor(private authService: AuthService,
                /*private signupForm: FormGroup,*/
                private router: Router) {
        /*this.signupRequestPayload = {
          username : '',
          email: '',
          password: ''
        },*/

        /*
              this.registrationUser = {
                  fname : "Angular",
                  lname: 'Angular',
                  login: 'user24',
                  password: 'password123123'
              }
        */

    }

    ngOnInit(): void {
        /*this.signupForm = new FormGroup({
          username: new FormControl('', Validators.required),
          email: new FormControl('', [Validators.required, Validators.email]),
          password: new FormControl('', Validators.required),
        });*/
    }

    signup() {
        console.log("Click button ");

        // potrebne skontrolova ci objekt nieje null a potom priradit
        /* if (this.signupForm.get('email').value != null ) {

         }*/


        // Take data from Signup Form and put to the Object
        // @ts-ignore
        //this.signupRequestPayload.email = this.signupForm.get('email').value;
        // @ts-ignore
        //  this.signupRequestPayload.username = this.signupForm.get('username').value;
        // @ts-ignore
//    this.signupRequestPayload.password = this.signupForm.get('password').value;


        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "text/plain");

        var raw = {

            "fname": "new user",
            "lname": "second name",
            "login": "user245",
            "password": "password123123"
        };

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        // @ts-ignore
        fetch("https://localhost:8080/signup", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));


        /*
              this.authService.signup(this.registrationUser)
                  .subscribe((data: any)=> {//(data: any)
                      console.log(data);
                  });*/
    }
}
