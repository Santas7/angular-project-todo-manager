import {Component} from "@angular/core";
import {HeaderComponent} from "../Header/header.component";


@Component({
  selector: 'Home',
  templateUrl: './home.component.html',
  standalone: true,
  imports: [
    HeaderComponent
  ],

})
export class HomeComponent{}
