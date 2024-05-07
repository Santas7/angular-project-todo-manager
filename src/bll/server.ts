import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor() { }
  login(email: string, password: string): boolean {
    return false;
  }
  register(email: string, password: string): boolean {
    return false;
  }
}

export class NoteService {
  constructor() { }
  getNotes(): any[] {
    return [];
  }
}
