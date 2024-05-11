import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import { ServerService } from '../../bll/store';
import {FormsModule} from "@angular/forms"; // замените на путь к вашему сервису

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    standalone: true,
    imports: [
        FormsModule,
        RouterLink
    ]
})
export class SignupComponent {

    constructor(private serverService: ServerService, private router: Router) { }

    signup(email: string, password: string): void {
        this.serverService.register(email, password)
            .subscribe((data: any) => {
                // Обработка успешной регистрации
                console.log(data);
                // Перенаправление на страницу входа
                this.router.navigate(['/login']); // замените '/login' на ваш путь
            }, (error: any) => {
                // Обработка ошибки
                console.error('Error:', error);
            });
    }
}
