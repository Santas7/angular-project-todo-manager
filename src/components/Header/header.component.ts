import { Component } from "@angular/core";
import {Router, RouterLink} from "@angular/router";
import { AuthService } from "../../bll/store";
import {NgIf} from "@angular/common";

@Component({
  selector: 'Header',
  templateUrl: './header.component.html',
  standalone: true,
  imports: [
    RouterLink,
    NgIf
  ],
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private authService: AuthService, private router: Router) {}

  isRegistered(): boolean {
    return this.authService.isRegistered();
  }

  logOut(): void {
    this.authService.logOut();
  }
}
