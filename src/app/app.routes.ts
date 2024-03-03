import { Routes } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    {path: 'signIn', component: SignInComponent},
    {path: 'home', component: HomeComponent},
    {path: '', redirectTo: 'signIn', pathMatch: 'full'}
];
