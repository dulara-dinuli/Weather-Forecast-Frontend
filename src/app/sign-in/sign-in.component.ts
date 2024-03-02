import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent implements OnInit{

  
  isSignDivVisible: boolean = false;
  signUpObj: SignUpModel = new SignUpModel();
  loginObj: LoginModel = new LoginModel();

  constructor(private router: Router) {}

  ngOnInit(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.clear();
    }
  }

  toggleSignDiv() {
    this.isSignDivVisible = !this.isSignDivVisible;
  }

  onRegister() {
    if (this.signUpObj.name && this.signUpObj.email && this.signUpObj.password) {
      const localUser = localStorage.getItem('weatherForecaseUsers');
      if (localUser != null) {
        const users = JSON.parse(localUser);
        const isUserPresent = users.find((user: SignUpModel) => user.email === this.signUpObj.email);
        if (isUserPresent === undefined) {
          users.push(this.signUpObj);
          localStorage.setItem('weatherForecaseUsers', JSON.stringify(users));
          alert('Registration Successful!');
          this.toggleSignDiv();
          this.signUpObj = new SignUpModel();
        } else {
          alert('User Already Registered!');
        }
      } else {
        const users = [this.signUpObj];
        localStorage.setItem('weatherForecaseUsers', JSON.stringify(users));
        alert('Registration Successful!');
        this.toggleSignDiv();
        this.signUpObj = new SignUpModel();
      }
    } else {
      alert('All fields are required!');
    }
  }

  onLogin() {
    if (this.loginObj.email && this.loginObj.password) {
      const localUsers = localStorage.getItem('weatherForecaseUsers');
      if (localUsers != null) {
        const users = JSON.parse(localUsers);
        const isUserPresent = users.find((user: SignUpModel) => user.email === this.loginObj.email && user.password === this.loginObj.password);
        if (isUserPresent !== undefined) {
          localStorage.setItem('loggedUser', JSON.stringify(isUserPresent));
          alert('Login Successful!');
          this.router.navigateByUrl('/home');
        } else {
          if (!users.find((user: SignUpModel) => user.email === this.loginObj.email)) {
            alert('User not found!');
          }else{
          alert('Invalid Password');
          }
        }
      }else{
        alert('User not found!');
      }
    } else {
      alert('Please enter both email and password!');
    }
  }
}

export class SignUpModel {
  name: string;
  email: string;
  password: string;

  constructor() {
    this.email = '';
    this.name = '';
    this.password = '';
  }
}

export class LoginModel {
  email: string;
  password: string;

  constructor() {
    this.email = '';
    this.password = '';
  }
}