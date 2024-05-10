import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { registrationUser, loggingInUser } from '../../bll/store';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  styleUrls: [
    './login.component.css'
  ],
  imports: [
    FormsModule,
    CommonModule
  ]
})
export class LoginComponent {

  isSignDivVisiable: boolean  = true;
  
  signUpObj: SignUpModel  = new SignUpModel();
  loginObj: LoginModel  = new LoginModel();
  constructor(private router: Router){}

  onRegister() {
    registrationUser(this.signUpObj);
  }
  onLogin() {
    loggingInUser(this.loginObj, this.router);
  }
}

export class SignUpModel  {
  name: string;
  email: string;
  password: string;

  constructor() {
    this.email = "";
    this.name = "";
    this.password= ""
  }
}

export class LoginModel  { 
  email: string;
  password: string;
  todoList: string[];
  constructor() {
    this.email = ""; 
    this.password= "";
    this.todoList=[""]
  }
}