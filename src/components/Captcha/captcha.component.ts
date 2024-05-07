import { Component, OnInit } from '@angular/core';
import {RouterLink} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";

@Component({
  selector: 'Captcha',
  templateUrl: './captcha.component.html',
  styleUrls: ['./captcha.component.css'],
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    NgIf
  ]
})
export class CaptchaComponent implements OnInit {
  generatedCaptcha?: string;
  userInput?: string;
  isCaptchaValid?: boolean;

  constructor() { }

  ngOnInit(): void {
    this.generateCaptcha();
  }

  generateCaptcha(): void {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let captcha = '';
    for (let i = 0; i < 6; i++) {
      captcha += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    this.generatedCaptcha = captcha;
  }

  checkCaptcha(): void {
    this.isCaptchaValid = this.userInput === this.generatedCaptcha;
  }
}
