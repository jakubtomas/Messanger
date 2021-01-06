import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../modules/material.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {UsersComponent} from './users/users.component';
import {HttpClientModule} from '@angular/common/http';
import {LoginComponent} from './login/login.component';
import {NavbarComponent} from './navbar/navbar.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {RegistrationComponent} from './registration/registration.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SignupComponent} from './auth/signup/signup.component';
import {MessageComponent} from './message/message.component';
import {LoginHistoryComponent} from './login-history/login-history.component';
import {ProfileComponent} from './profile/profile.component';
import {MessagesComponent} from './messages/messages.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {UserEditComponent} from './user-edit/user-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    LoginComponent,
    NavbarComponent,
    PageNotFoundComponent,
    RegistrationComponent,
    SignupComponent,
    MessageComponent,
    LoginHistoryComponent,
    ProfileComponent,
      MessagesComponent,
      UserEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
