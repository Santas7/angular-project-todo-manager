import {Component} from "@angular/core";
import {HeaderComponent} from "../Header/header.component";
import {RouterLink} from "@angular/router";
import {NgForOf, NgOptimizedImage} from "@angular/common";


@Component({
  selector: 'Home',
  templateUrl: './home.component.html',
  standalone: true,
  imports: [
    HeaderComponent,
    RouterLink,
    NgOptimizedImage,
    NgForOf
  ],

})
export class HomeComponent{}
