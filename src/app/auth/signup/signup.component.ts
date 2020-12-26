import {Component, OnInit} from '@angular/core';
//import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {UsersService} from "../../services/users.service";
import {RegistrationUser} from "./registrationUser";
import {debounce} from "lodash-es";

@Component({
    selector: 'signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

    public password2: string = '';
    public pswdMessage: string = '';
    public value: string = '';
    public error: string = '';
    registrationUser = new RegistrationUser();

    constructor(private userService: UsersService,
                private router: Router) {
    }

    ngOnInit(): void {
        /*this.signupForm = new FormGroup({
          username: new FormControl('', Validators.required),
          email: new FormControl('', [Validators.required, Validators.email]),
          password: new FormControl('', Validators.required),
        });*/
    }


    get printAuth() {
        return JSON.stringify(this.registrationUser);
    }

    get printData() {
        return JSON.stringify(this.value)
    }

    get printError() {
        return JSON.stringify(this.error)
    }

    onSubmit() {
        console.log("Click button  onSubmit");
        this.userService.signup(this.registrationUser)
            .subscribe((data: any) => {//(data: any)
                    console.log("data in signup");

                    console.log(data);
                    console.log("Json stringifz data  " + JSON.stringify(data));

                this.value = data;

                if (data) {
                    this.router.navigateByUrl("/login");
                }
                // todo  when account successfully created do redirectAfterRegistration to Login component
                // this.router.navigateByUrl(this.userService.redirectAfterLogin);
                }
            );
    }

    writingPassword() {

    }

    confirmPassword = debounce((): void => {

        console.log('first password   ' + this.registrationUser.password);
        console.log("second password   " + this.password2);

        if (this.registrationUser.password !== this.password2) {
            this.pswdMessage = 'Passwords must match';
        } else {
            this.pswdMessage = '';
        }


    }, 300);


}
