import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import { ApiService } from '../../bll/store';
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
    ],
    styleUrls: ['./login.component.css']
})
export class LoginComponent {

    loginData = {
        usernameOrEmail: '',
        password: '',
        rememberMe: false
    };

    errorMessage: string = '';

    constructor(private apiService: ApiService, private router: Router) { }

    login() {
        this.errorMessage = ''; // Очистить предыдущие сообщения об ошибках
        this.apiService.loginUser(this.loginData)
            .subscribe(
                (response: any) => {
                    // Успешный вход, перенаправление на другую страницу (например, домашнюю страницу)
                    this.router.navigate(['/home']);
                },
                (error: any) => {
                    // Обработка ошибки входа
                    this.errorMessage = 'Неверное имя пользователя или пароль.';
                    console.error('Ошибка при входе:', error);
                }
            );
    }

}
