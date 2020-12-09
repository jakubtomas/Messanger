import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UsersComponent} from "./users/users.component";
import {LoginComponent} from "./login/login.component";
import {SignupComponent} from "./auth/signup/signup.component";
//import {SignupComponent} from "./auth/signup/signup.component";

// todo you have to add default , also page , and also Error page
const routes: Routes = [
  {path: 'users', component: UsersComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
