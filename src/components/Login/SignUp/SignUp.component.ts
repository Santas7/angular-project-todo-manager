import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'SignUp',
  templateUrl: './signup.component.html',
  standalone: true,
  styleUrls: [
    './login.component.css'
  ],
  imports: [
    FormsModule,
    CommonModule
  ]
})
export class SignUpComponent {

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