import { Component } from '@angular/core';

import {Store} from '../../bll/store';
import {FormsModule} from "@angular/forms";
import {NgClass} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [
    FormsModule,
    NgClass
  ],
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  isSignDivVisible: boolean = false;

  signUpObj: SignUpModel = new SignUpModel();
  loginObj: LoginModel = new LoginModel();

  constructor(private router: Router, private store: Store) { }

  onRegister() {
    this.store.registerUser(this.signUpObj.name, this.signUpObj.email, this.signUpObj.password);
    alert("Регистрация успешно прошла!");
  }

  onLogin() {
    const loggedIn = this.store.loginUser(this.loginObj.email, this.loginObj.password);
    if (loggedIn) {
      alert("Вы успешно вошли в систему!");
      this.router.navigate(['/home']);
    }
    else {
      alert("Ошибка входа в систему!");
    }
  }
}

export class SignUpModel {
  name: string;
  email: string;
  password: string;

  constructor() {
    this.email = "";
    this.name = "";
    this.password = ""
  }
}

export class LoginModel {
  email: string;
  password: string;

  constructor() {
    this.email = "";
    this.password = "";
  }
}
