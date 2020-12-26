import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UsersComponent} from "./users/users.component";
import {LoginComponent} from "./login/login.component";
import {SignupComponent} from "./auth/signup/signup.component";
import {LoginHistoryComponent} from "./login-history/login-history.component";
import {MessagesComponent} from "./messages/messages.component";
import {ProfileComponent} from "./profile/profile.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
//import {SignupComponent} from "./auth/signup/signup.component";

// todo you have to add default , also page , and also Error page
const routes: Routes = [
  {path: 'users', component: UsersComponent},
  {path: 'login', component: LoginComponent},
    {path: 'signup', component: SignupComponent},
    {path: 'loginHistory', component: LoginHistoryComponent},
    {path: 'messages', component: MessagesComponent},
  {path: 'profile', component: ProfileComponent},
  {path: '', redirectTo: '/users', pathMatch: 'full'}, // default page
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
