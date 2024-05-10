import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { isRegistered } from '../bll/store';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(private router: Router) {
    if (!isRegistered()) {
      this.router.navigate(['/login']); 
    }
  }
}