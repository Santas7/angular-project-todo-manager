import { Component } from "@angular/core";
import {RouterLink} from "@angular/router";
import {isRegistered, logOut} from "../../bll/store";
import {NgIf} from "@angular/common";

@Component({
  selector: 'Header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: true,
  imports: [
    RouterLink,
    NgIf
  ],
  exportAs: 'Header'
})
export class HeaderComponent {
  protected readonly isRegistered = isRegistered;
  protected readonly logOut = logOut;
}