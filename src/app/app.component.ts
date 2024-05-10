import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../bll/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    if (!this.authService.isRegistered()) {
      this.router.navigate(['/login']);
    }
  }
}
