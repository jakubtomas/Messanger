import {Component, OnInit} from '@angular/core';
import {UsersService} from "../services/users.service";
import {SnackbarService} from "../services/snackbar.service";
import {Router} from "@angular/router";
import {error} from "selenium-webdriver";


declare var $: any;

@Component({
    selector: 'app-user-delete',
    templateUrl: './user-delete.component.html',
    styleUrls: ['./user-delete.component.css']
})
export class UserDeleteComponent implements OnInit {

    password: string;
    errorFromServer: string;


    constructor(private usersService: UsersService, private snackbarService: SnackbarService,
                private router: Router) {
        this.password = "";
        this.errorFromServer = "";
    }

    ngOnInit(): void {
    }


    onSubmit() {

        console.log("click delete Account password " + this.password);

        this.usersService.deleteUser(this.password).subscribe(data => {


            if (data.error) {
                this.errorFromServer = data.error;
                console.log("we have error " + data.error);
                this.snackbarService.errorMsg(data.error);

            }
            if (data.message) {
                console.log("we have message" + data.message);
                this.snackbarService.successMsg('Account has been deleted successfully');
                $("#delete-user-modal").modal('hide');

                this.usersService.logout();
                this.router.navigateByUrl("/signup");
            }

            // correct password
            /*if (data) {
              console.log("what are true data from server after delete account " + data );

             // $("#edit-user-modal").modal('hide');
              //presmerovanie na domovu stranku
              this.usersService.logout();
              this.snackbarService.successMsg('Account has been deleted successfully');
              this.router.navigateByUrl("/signup");

            } else { // wrong password
              //send message
              console.log("what are data from server after delete account " + data );
              this.snackbarService.errorMsg('Incorrect Password Idiot try again ');
            }*/

        })

    }

}
