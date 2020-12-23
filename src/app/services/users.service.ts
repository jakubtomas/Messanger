import {Injectable} from '@angular/core';
import {User} from "../entities/users";
import {EMPTY, Observable, of, throwError} from "rxjs";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {RegistrationUser} from "../auth/signup/registrationUser";
import {MessageService} from "./message.service";
import {catchError, map} from "rxjs/operators";
import {Auth} from "../entities/auth";

/// anotacia ma sa tento servis brat do uvahz

@Injectable({
    providedIn: 'root'
})
export class UsersService {


    private serverUrl = "http://localhost:8080/";

    constructor(private http: HttpClient,
                private messageService: MessageService) {

    }


    set token(value: string) {
        if (value)
            localStorage.setItem('token', value);
        else
            localStorage.removeItem('token');
    }

    get token() {
        // @ts-ignore
        return localStorage.getItem('token');
    }


    signup(registrationUser: RegistrationUser): Observable<any> {


        //console.log(this.httpClient.post('localhost:8080/signup', registrationUser, {responseType: 'text'}));
        console.log("Auth.service");

        return this.http.post(this.serverUrl + "signup", registrationUser,)
            .pipe(
                map(data => {
                    console.log(data);
                    
                    console.log(" data from pipe " + JSON.stringify(data));
                    this.messageService.sendMessage(JSON.stringify(data), true);
                    return true;
                }),
                catchError(error => {
                    //  this.logout();
                    return this.processHttpError(error);
                })
            );
    }


    login(auth: Auth): Observable<boolean | void> {
        return this.http.post(this.serverUrl + "login", auth, {responseType: 'text'}).pipe(
            map(data => {
                console.log(data);

                console.log("Login data user.service" + JSON.stringify(data));

                //this.token = token;
                //this.user = auth.name;
                this.messageService.sendMessage(`Nahlásenie používateľa ${data} úspešné`, false);
                return true;
            }),
            catchError(error => {
                //     this.logout();
                console.log(" error from login" + error);


                return this.processHttpError(error);
            })
        );
    }


    /*getUsers(): Observable<User[]> {
        return of(this.users)
    }*/
    processHttpError(error) {
        console.log(error);

        if (error instanceof HttpErrorResponse) {
            if (error.status === 0) {
                this.messageService.sendMessage("Server je nedostupný");
            } else {
                if (error.status >= 400 && error.status < 500) {
                    const message = error.error.error
                        ? error.error.error
                        : JSON.parse(error.error).error;
                    //   const message = error.error.error ?? JSON.parse(error.error).error;
                    console.log(message);

                    this.messageService.sendMessage(message);
                } else {
                    this.messageService.sendMessage("chyba servera: " + error.message);
                }
            }
        } else {
            this.messageService.sendMessage("Chyba programátora : " + JSON.stringify(error));
        }
        console.error("Chyba zo servera: ", error);
        return EMPTY;
    }


}
