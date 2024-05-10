import { Component } from "@angular/core";
import {Router, RouterLink} from "@angular/router";

import {NgIf} from "@angular/common";
import {Store} from "../../bll/store";

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
  constructor(private router: Router, private store: Store) {}

  isRegistered(): boolean {
    let f = this.store.getCurrentUsername();
    return f !== undefined && f !== null && f !== "";
  }

  logOut(): void {
    this.store.logOut();
  }
}
