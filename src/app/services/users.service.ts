import {Injectable} from '@angular/core';
import {User} from "../entities/users";
import {EMPTY, Observable, of, Subscriber, throwError} from "rxjs";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {RegistrationUser} from "../auth/signup/registrationUser";
import {MessageService} from "./message.service";
import {catchError, map, mapTo} from 'rxjs/operators';
import {Auth} from "../entities/auth";
import {HttpHeaders} from '@angular/common/http';
import {getToken} from "codelyzer/angular/styles/cssLexer";
import {ItemHistory} from "../entities/itemHistory";
import {MyUser} from '../entities/user';


/// anotacia ma sa tento servis brat do uvahz

@Injectable({
    providedIn: 'root'
})
export class UsersService {

    loginForApi: string = '';
    //public redirectAfterLogin =  this.defaultRedirect;


    private serverUrl = "http://localhost:8080/";
    public activeLogin: string = '';
    // @ts-ignore
    private loggedUserSubscriber: Subscriber<string>;

    constructor(private http: HttpClient,
                private messageService: MessageService) {

        //this.loggedUserSubscriber = '';
        //  this.loggedUserSubscriber.next('');


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

    set user(value: string) {
        this.loggedUserSubscriber.next(value);
        if (value) {
            localStorage.setItem('user', value);
        } else
            localStorage.removeItem('user');
    }

    get user() {
        //  this.loggedUserSubscriber.next(value);

        //   return localStorage.getItem('user');
        // @ts-ignore
        return localStorage.getItem('user');

    }



    getUserObservable(): Observable<string> {
        return new Observable(subscriber => {
            this.loggedUserSubscriber = subscriber;
            subscriber.next(this.user);
        });
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
                //  this.activeLogin = auth.login;
                this.user = auth.login;

                console.log(` askking for token ` + this.token);
                //this.token("hello");
                this.loginForApi = auth.login;
                this.messageService.sendMessage(`Nahlásenie používateľa ${auth.login} ${token} úspešné`, false);
                return true;
            }),
            catchError(error => {
                //     this.logout();

                // @ts-ignore
                this.user = null;
                // @ts-ignore
                this.token = null;
                console.log(" error from login" + error);
                console.log(" error from login" + error.toString());
                console.log(" error from login" + JSON.stringify(error));


                return this.processHttpError(error);
            })
        );
    }

    logout() {
        // @ts-ignore
        this.token = null;
        // @ts-ignore
        this.user = null;

        //todo okey but you should also delete token from database not only frontend
    }
    getLoginHistory(): Observable<any> {

        let httpHeaders = new HttpHeaders(
            {
                'Content-Type': 'application/json',
                'Authorization': 'my-auth-token'
            });


        console.log('getLogin history token is ' + this.token);
        console.log('login' + this.token);


        httpHeaders = httpHeaders.set('Authorization', this.token);

        const body = JSON.stringify({login: this.user});


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

  editUser(user: MyUser): Observable<any> {
    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorisation: 'token'
    });

    httpHeaders = httpHeaders.set('Authorization', this.token);
    const requestBody = JSON.stringify({
      login: user.login,
      fname: user.fName,
      lname: user.lName
    });

    return this.http.patch<Array<any>>(this.serverUrl + 'update', requestBody, {headers: httpHeaders}).pipe(
      mapTo(true),
      catchError(error => {

        console.log(' error from GetLoginHistory' + error);
        console.log(' error from GetLoginHistory' + error.toString());
        console.log(' error from GetLoginHistory' + JSON.stringify(error));

        return this.processHttpError(error);
      })
    );
  }

  getUser(): Observable<any> {
    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      token: 'token'
    });

    httpHeaders = httpHeaders.set('token', this.token);
    const requestBody = JSON.stringify({login: this.user});

    return this.http.post<Array<any>>(this.serverUrl + 'user', requestBody, {headers: httpHeaders}).pipe(
      map(user => {
        console.log(user);
        return user;
      }),
      catchError(error => {
        //     this.logout();
        console.log(' error from GetLoginHistory' + error);
        console.log(' error from GetLoginHistory' + error.toString());
        console.log(' error from GetLoginHistory' + JSON.stringify(error));

        return this.processHttpError(error);
      })
    );
  }

    getAllUsers(): Observable<any> {

        let httpHeaders = new HttpHeaders(
            {
                'Content-Type': 'application/json',
                'Authorization': 'my-auth-token'
            });


        console.log('Get ALL Users token' + this.token);
        console.log(this.token);


        httpHeaders = httpHeaders.set('Authorization', this.token);

        const body = JSON.stringify({login: this.user});


        return this.http.post<Array<any>>(this.serverUrl + "users", body, {headers: httpHeaders}).pipe(
            map(allUsers => {
                console.log(allUsers);
                console.log("data from GetLoginHistory" + allUsers);
                console.log("data from GetLoginHistory" + JSON.stringify(allUsers));

                return allUsers;


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

    // todo  new function getMessagesFromUser
    getMessagesFromUser(user: string): Observable<any> {

        let httpHeaders = new HttpHeaders(
            {
                'Content-Type': 'application/json',
                'Authorization': 'my-auth-token'
            });


        console.log('Get ALL Users token' + this.token);
        console.log(this.token);


        httpHeaders = httpHeaders.set('Authorization', this.token);

        //todo how are input parameters for JSON and output
        // check the postman for one message and also how to send message to another user
        // which input data are necessary for request

        const body = JSON.stringify({login: this.user});

        return this.http.post<Array<any>>(this.serverUrl + "users", body, {headers: httpHeaders}).pipe(
            map(allUsers => {
                console.log(allUsers);
                console.log("data from GetLoginHistory" + allUsers);
                console.log("data from GetLoginHistory" + JSON.stringify(allUsers));

                return allUsers;


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
            console.log("error from server " + error);
            console.log(error);

            this.messageService.sendMessage("Chyba programátora : " + JSON.stringify(error));
        }
        console.error("Chyba zo servera: ", error);
        return EMPTY;
    }
}
