import {Component, OnInit} from "@angular/core";
import {HeaderComponent} from "../Header/header.component";
import {RouterLink, Router} from "@angular/router";
import {NgForOf, NgOptimizedImage} from "@angular/common";
import {NgIf} from "@angular/common";


@Component({
  selector: 'Home',
  templateUrl: './home.component.html',
  standalone: true,
  imports: [
    HeaderComponent,
    RouterLink,
    NgOptimizedImage,
    NgIf,
    NgForOf
  ],

})
export class HomeComponent implements OnInit {
  isLoggedIn: boolean = false;

  ngOnInit(): void {
      this.refresh();
  }

  refresh(): void {
      this.isLoggedIn = !!localStorage.getItem('current_user_email');
  }
}

