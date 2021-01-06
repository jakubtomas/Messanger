import { Injectable } from '@angular/core';
import { EMPTY, Observable, Subscriber } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { RegistrationUser } from '../auth/signup/registrationUser';
import { MessageService } from './message.service';
import { catchError, map, mapTo } from 'rxjs/operators';
import { Auth } from '../entities/auth';
import { HttpHeaders } from '@angular/common/http';
import { ItemHistory } from '../entities/itemHistory';
import { MyUser } from '../entities/user';
import { Router} from '@angular/router';
import { SnackbarService } from './snackbar.service';
import {Message} from '../entities/message';


// anotacia ma sa tento servis brat do uvahz

@Injectable({
    providedIn: 'root'
})
export class UsersService {

  loginForApi = '';
  public redirectAfterLogin;
  private defaultRedirect = '/messages';

  private serverUrl = 'http://localhost:8080/';
  public activeLogin = '';
  // @ts-ignore
  private loggedUserSubscriber: Subscriber<string>;

  constructor(private http: HttpClient, private messageService: MessageService, private router: Router, private snackbarService: SnackbarService) {}

  set token(value: string) {
    if (value) {localStorage.setItem('token', value);
    } else {localStorage.removeItem('token'); }
  }
  get token(): string {return localStorage.getItem('token') as string;}

  set user(value: string) {
    this.loggedUserSubscriber.next(value);
    if (value) {localStorage.setItem('user', value);
    } else {localStorage.removeItem('user'); }
  }
  get user() {
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
    // console.log(this.httpClient.post('localhost:8080/signup', registrationUser, {responseType: 'text'}));
    console.log('Auth.service');

    return this.http.post(this.serverUrl + 'signup', registrationUser, ).pipe(
      map(data => {
        console.log(data);

        console.log(' data from pipe ' + JSON.stringify(data));
        // this.messageService.sendMessage(JSON.stringify(data), true);
        this.snackbarService.successMsg('Registration successful');
        this.router.navigateByUrl('/login');
        return true;
      }),
      catchError(error => {
        //  this.logout();
        return this.processHttpError(error);
      })
    );
  }

  login(auth: Auth): Observable<boolean | void> {
    return this.http.post(this.serverUrl + 'login', auth, {responseType: 'text'}).pipe(
      map(token => {
        console.log(token);
        console.log('data is in login ' + token);
        console.log('Login data user.service' + JSON.stringify(token));

        this.token = token;
        //  this.activeLogin = auth.login;
        this.user = auth.login;

        console.log(` askking for token ` + this.token);
        // this.token("hello");
        this.loginForApi = auth.login;
        // this.messageService.sendMessage(`Welcome ${auth.login}, login successful`, false);
        this.snackbarService.successMsg(`Welcome ${auth.login}, login successful`);
        this.router.navigateByUrl(this.defaultRedirect);
        return true;
      }),
      catchError(error => {
        //     this.logout();

        // @ts-ignore
        this.user = null;
        // @ts-ignore
        this.token = null;
        console.log(' error from login' + error);
        console.log(' error from login' + error.toString());
        console.log(' error from login' + JSON.stringify(error));
        return this.processHttpError(error);
      })
    );
  }

    logout() {
        // @ts-ignore
        this.token = null;
        // @ts-ignore
        this.user = null;

        // todo  okey but you should also delete token from database not only frontend
    }
    getLoginHistory(): Observable<any> {

        let httpHeaders = new HttpHeaders(
            {
                'Content-Type': 'application/json',
                Authorization: 'my-auth-token'
            });


        console.log('getLogin history token is ' + this.token);
        console.log('login' + this.token);


        httpHeaders = httpHeaders.set('Authorization', this.token);

        const body = JSON.stringify({login: this.user});


        return this.http.post<Array<any>>(this.serverUrl + 'log', body, {headers: httpHeaders}).pipe(
            map(itemsHistory => {
                console.log(itemsHistory);
                console.log('data from GetLoginHistory' + itemsHistory);
                console.log('data from GetLoginHistory' + JSON.stringify(itemsHistory));

                return this.mapToItemHistory(itemsHistory);


                // return itemsHistory;
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
                Authorization: 'my-auth-token'
            });


        console.log('Get ALL Users token' + this.token);
        console.log(this.token);


        httpHeaders = httpHeaders.set('Authorization', this.token);

        const body = JSON.stringify({login: this.user});


        return this.http.post<Array<any>>(this.serverUrl + 'users', body, {headers: httpHeaders}).pipe(
            map(allUsers => {
                console.log(allUsers);
                console.log('data from GetLoginHistory' + allUsers);
                console.log('data from GetLoginHistory' + JSON.stringify(allUsers));

                return allUsers;


                // return itemsHistory;
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

  getMessagesFromUser(fromUser: string): Observable<any> {

    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Authorization'
    });
    httpHeaders = httpHeaders.set('Authorization', this.token);

    const body = JSON.stringify({
      login: this.user,
      from: fromUser,
    });

    console.log(this.user);
    console.log(fromUser);

    return this.http.post<Array<any>>(this.serverUrl + 'messages', body, {headers: httpHeaders}).pipe(
      map(messages => {
        console.log('GET MESSAGES ' + JSON.stringify(messages));
        return this.mapToMessages(messages);
      }),
      catchError(error => {
        console.log(' error from GetLoginHistory' + JSON.stringify(error));
        return this.processHttpError(error);
      })
    );
  }

  mapToMessages(messages: Array<any>): Message[] {
    return messages.map(item => new Message(item.from, item.message, item.to));
  }

  newMessage(message: Message): Observable<boolean> {

    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Authorization'
    });
    httpHeaders = httpHeaders.set('Authorization', this.token);

    const body = JSON.stringify({
      from: message.from,
      to: message.to,
      message: message.message
    });

    return this.http.post<Array<any>>(this.serverUrl + 'message/new', body, {headers: httpHeaders}).pipe(
      map(_ => true),
      catchError(error => {
        console.log(' error from GetLoginHistory' + JSON.stringify(error));
        return this.processHttpError(error);
      })
    );
  }

  processHttpError(error): Observable<never> {
    console.log(error);

    if (error instanceof HttpErrorResponse) {
      if (error.status === 0) {
        this.messageService.sendMessage('Server unavailable');
      } else {
        if (error.status >= 400 && error.status < 500) {
          const message = error.error.error
            ? error.error.error
            : JSON.parse(error.error).error;
          //   const message = error.error.error ?? JSON.parse(error.error).error;
          console.log(message);

          this.messageService.sendMessage(message);
        } else {
          this.messageService.sendMessage('Server error: ' + error.message);
        }
      }
    } else {
      console.log('Server error ' + error);
      console.log(error);

      this.messageService.sendMessage('Client error : ' + JSON.stringify(error));
    }
    console.error('Server error: ', error);
    return EMPTY;
  }
}
