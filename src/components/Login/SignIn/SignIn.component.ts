import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'SignIn',
  templateUrl: './signin.component.html',
  standalone: true,
  styleUrls: [
    './login.component.css'
  ],
  imports: [
    FormsModule,
    CommonModule
  ]
})
export class SignInComponent {

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