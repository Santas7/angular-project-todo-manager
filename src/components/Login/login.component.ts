import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import { ServerService } from '../../bll/store';
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    standalone: true,
    imports: [
        FormsModule,
        RouterLink,
        NgIf
    ]
})
export class LoginComponent {
    generatedCaptcha?: string;
    userInput?: string;
    isCaptchaValid?: boolean;

    constructor(private serverService: ServerService, private router: Router) { }
    ngOnInit(): void {
        if (localStorage.getItem("current_user_email")) {
            this.router.navigate(["/home"]);
        }
        this.generateCaptcha();
    }
    login(email: string, password: string): void {

        this.serverService.login(email, password)
            .subscribe((data: any) => {
                console.log(data);

                if (data.message === "Invalid email or password") {
                    alert("Ошибка! Неверный email или пароль!");
                }
                else {
                    alert("Вы успешно вошли в систему!");
                    localStorage.setItem("current_user_email", email);
                    this.router.navigate(['/home']);
                    window.location.reload();
                }
            }, (error: any) => {
                console.error('Error:', error);
            });
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
        if (!this.isCaptchaValid) {
            this.generateCaptcha();
        }
    }
}