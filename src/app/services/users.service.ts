import {Injectable} from '@angular/core';
import {User} from "../entities/users";
import {EMPTY, Observable, of, throwError} from "rxjs";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {RegistrationUser} from "../auth/signup/registrationUser";
import {MessageService} from "./message.service";
import {catchError, map} from "rxjs/operators";
import {Auth} from "../entities/auth";
import {HttpHeaders} from '@angular/common/http';
import {getToken} from "codelyzer/angular/styles/cssLexer";
import {ItemHistory} from "../entities/itemHistory";

/// anotacia ma sa tento servis brat do uvahz

@Injectable({
    providedIn: 'root'
})
export class UsersService {

    loginForApi: string = '';


    private serverUrl = "http://localhost:8080/";


    constructor(private http: HttpClient,
                private messageService: MessageService) {




    }

    private set token(value: string) {
        if (value) {
            localStorage.setItem('token', value);
            //this.httpOptions.headers = this.httpOptions.headers.set('Authorization', value);

        } else {

            localStorage.removeItem('token');
        }
    }

    private get token(): string {
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
            map(token => {
                console.log(token);
                console.log("data is in login " + token);
                console.log("Login data user.service" + JSON.stringify(token));


                this.token = token;


                console.log(` askking for token ` + this.token);

                // @ts-ignore
                //this.token("hello");
                this.user = auth.login;
                this.loginForApi = auth.login;
                this.messageService.sendMessage(`Nahlásenie používateľa ${auth.login} ${token} úspešné`, false);
                return true;
            }),
            catchError(error => {
                //     this.logout();
                console.log(" error from login" + error);
                console.log(" error from login" + error.toString());
                console.log(" error from login" + JSON.stringify(error));


                return this.processHttpError(error);
            })
        );
    }

    getLoginHistory(): Observable<any> {

        let httpHeaders = new HttpHeaders(
            {
                'Content-Type': 'application/json',
                'Authorization': 'my-auth-token'
            });


        console.log('getLogin history token is ' + this.token);

        httpHeaders = httpHeaders.set('Authorization', this.token);

        const body = JSON.stringify({login: this.loginForApi});


        return this.http.post<Array<any>>(this.serverUrl + "log", body, {headers: httpHeaders}).pipe(
            map(itemsHistory => {
                console.log(itemsHistory);
                console.log("data from GetLoginHistory" + itemsHistory);
                console.log("data from GetLoginHistory" + JSON.stringify(itemsHistory));

                return this.mapToItemHistory(itemsHistory);


                //return itemsHistory;
            }),
            catchError(error => {
                //     this.logout();
                console.log(" error from GetLoginHistory" + error);
                console.log(" error from GetLoginHistory" + error.toString());
                console.log(" error from GetLoginHistory" + JSON.stringify(error));


                return this.processHttpError(error);
            })
        );

    }

    mapToItemHistory(itemsHistoryFromServer: Array<any>): ItemHistory[] {
        return itemsHistoryFromServer.map(item => new ItemHistory(item.datetime, item.type, item.login));
    }

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
