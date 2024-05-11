import { Component } from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {NgIf} from "@angular/common";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    standalone: true,
    imports: [
        RouterLink,
        NgIf
    ],
    styleUrls: ['./header.component.css']
})
export class HeaderComponent {
    isLoggedIn: boolean = false;

    constructor(private router: Router) {
        if (typeof localStorage !== 'undefined') {
            this.isLoggedIn = localStorage.getItem('current_user_email') !== null;
        } else {
            this.isLoggedIn = false;
        }
    }

    logout(): void {
        localStorage.removeItem('current_user_email');
        this.router.navigate(["/login"])
    }
}
