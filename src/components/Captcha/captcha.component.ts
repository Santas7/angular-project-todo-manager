import {Component} from "@angular/core";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'Captcha',
  templateUrl: './captcha.component.html',
  standalone: true,
  imports: [
    RouterLink
  ]
})
export class CaptchaComponent {}

