import {Component, OnInit} from '@angular/core';
import {UsersService} from "../services/users.service";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {Auth} from "../entities/auth";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    auth = new Auth();

    /*auth = new Auth();
    originalAuth = new Auth();
    submitted = false;
  */
    constructor(private userService: UsersService,
                private router: Router) {
    }

    ngOnInit(): void {
    }

    get printAuth() {
        return JSON.stringify(this.auth);
        //return null;
    }



    onSubmit() {
        // todo redirect what happend when false or true
        console.log("On submit login");
        console.log(this.auth);
        this.userService.login(this.auth).subscribe()

        /*   this.userService.login(this.auth).subscribe(
               success => {
                 if (success) {
                   this.submitted = true;
                   console.log("Login successful");
                   this.router.navigateByUrl(this.userService.redirectAfterLogin);
                   this.userService.setDefaultRedirect();
                 }
               } );*/
    }

    /*  canDeactivate(): boolean | Observable<boolean> {
        console.log("Deactivate guard v login komponente použitý");
        if (this.originalAuth.name === this.auth.name &&
            this.originalAuth.password === this.auth.password)
          return true;
        if (this.submitted)
          return true;
        return window.confirm("Vyplnili ste údaje. Naozaj chcete odísť?");
      }*/
}
