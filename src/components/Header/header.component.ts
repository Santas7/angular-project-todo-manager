import { Component } from "@angular/core";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'Header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: true,
  imports: [
    RouterLink
  ],
  exportAs: 'Header'
})
export class HeaderComponent {}
