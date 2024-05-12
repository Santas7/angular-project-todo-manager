import { Component, OnInit } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {NgIf} from "@angular/common";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    standalone: true,
    imports: [
        NgIf,
        RouterLink
    ]
})
export class HeaderComponent implements OnInit {
    isLoggedIn: boolean = false;

    constructor(private router: Router) {}

    ngOnInit(): void {
        this.refresh();
    }

    refresh(): void {
        this.isLoggedIn = !!localStorage.getItem('current_user_email');
    }

    logout(): void {
        localStorage.removeItem('current_user_email');
        this.refresh(); // Обновляем статус isLoggedIn после выхода
        this.router.navigate(['/login']);
    }
}
