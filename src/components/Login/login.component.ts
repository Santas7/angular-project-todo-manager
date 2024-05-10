import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../bll/store';
import {LoginModel, SignInComponent} from "./SignIn/SignIn.component";
import {SignUpComponent, SignUpModel} from "./SignUp/SignUp.component";
import {ToggleWelcomeComponent} from "./ToggleWelcome/toggle-welcome.component";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  styleUrls: [
    './login.component.css'
  ],
  imports: [
    FormsModule,
    CommonModule,
    SignInComponent,
    SignUpComponent,
    ToggleWelcomeComponent
  ]
})
export class LoginComponent {
  signUpObj: SignUpModel  = new SignUpModel();
  loginObj: LoginModel  = new LoginModel();
  constructor(private authService: AuthService, private router: Router){}

  onRegister() {
    this.authService.registrationUser(this.signUpObj);
  }
  onLogin() {
    this.authService.loggingInUser(this.loginObj);
  }
}



