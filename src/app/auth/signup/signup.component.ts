import {Component, OnInit} from '@angular/core';
//import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {UsersService} from "../../services/users.service";
import {RegistrationUser} from "./registrationUser";
import {debounce} from "lodash-es";
import {SnackbarService} from "../../services/snackbar.service";

@Component({
    selector: 'signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

    public password2: string = '';
    public pswdMatchMessage: boolean = false;
    public pswdLengthMessage: boolean = true;
    public value: string = '';
    public error: string = '';
    public doesntMatchPasswords: boolean = true;
    registrationUser = new RegistrationUser();

    constructor(private userService: UsersService,
                private router: Router,
                private snackbarService: SnackbarService) {
    }

    ngOnInit(): void {

    }



    onSubmit() {
        console.log("Click button  onSubmit");

        if (this.registrationUser.password !== this.password2) {
            this.pswdMatchMessage = true;
            this.snackbarService.errorMsg('Password must match');

        } else {
            this.userService.signup(this.registrationUser).subscribe();
        }

    }


    confirmPassword = debounce((): void => {

        console.log('first password   ' + this.registrationUser.password);
        console.log("second password   " + this.password2);

        if (this.registrationUser.password.length > 5 && this.password2.length > 5) {
            this.pswdLengthMessage = false;
        }

        this.pswdMatchMessage = this.registrationUser.password !== this.password2;


    }, 300);


}
