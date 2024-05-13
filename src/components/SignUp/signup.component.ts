import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import { ServerService } from '../../bll/store';
import {FormsModule} from "@angular/forms";

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

    constructor(private serverService: ServerService, public router: Router) { }

    signup(email: string, password: string): void {
        this.serverService.register(email, password)
            .subscribe((data: any) => {
                console.log(data);
                this.router.navigate(['/login']);
            }, (error: any) => {
                console.error('Error:', error);
            });
    }
}
