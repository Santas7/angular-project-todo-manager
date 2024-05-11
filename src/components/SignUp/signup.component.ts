import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../bll/store';
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    standalone: true,
    imports: [
        FormsModule,
        NgIf
    ]
})
export class SignupComponent {

    signupData = {
        username: '',
        email: '',
        password: '',
        repeatPassword: ''
    };

    errorMessage: string = '';

    constructor(private apiService: ApiService, private router: Router) { }

    signup() {
        if (this.signupData.password !== this.signupData.repeatPassword) {
            this.errorMessage = 'Пароли не совпадают.';
            return;
        }

        this.errorMessage = ''; // Очистить предыдущие сообщения об ошибках

        this.apiService.registerUser(this.signupData)
            .subscribe(
                (response: any) => {
                    // Успешная регистрация, перенаправление на страницу входа
                    this.router.navigate(['/login']);
                },
                (error: any) => {
                    // Обработка ошибки регистрации
                    this.errorMessage = 'Ошибка при регистрации пользователя.';
                    console.error('Ошибка при регистрации:', error);
                }
            );
    }

}
