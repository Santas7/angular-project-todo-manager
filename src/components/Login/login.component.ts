import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import { ServerService } from '../../bll/store';
import {FormsModule} from "@angular/forms"; // замените на путь к вашему сервису

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    standalone: true,
    imports: [
        FormsModule,
        RouterLink
    ]
})
export class LoginComponent {

    constructor(private serverService: ServerService, private router: Router) { }

    login(email: string, password: string): void {
        this.serverService.login(email, password)
            .subscribe((data: any) => {
                // Обработка успешного входа
                console.log(data);
                localStorage.setItem("current_user_email", email);
                // Перенаправление на другую страницу
                this.router.navigate(['/home']); // замените '/dashboard' на ваш путь
            }, (error: any) => {
                // Обработка ошибки
                console.error('Error:', error);
            });
    }
}
