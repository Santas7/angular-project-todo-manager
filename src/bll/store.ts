import { Injectable } from '@angular/core';
import {Route, Router} from "@angular/router";

export interface Note {
  title: string;
  text: string;
  status: string;
}

interface User {
  username: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class Store {
  private users: User[] = [];
  private notes: { [username: string]: Note[] } = {};
  constructor(private router: Router) {this.init();}


  private init(): void {
    this.users = this.getUsersFromLocalStorage() || [];
    this.notes = this.getNotesFromLocalStorage() || {};
  }

  public getNotesForUser(username: string): Note[] {
    return this.notes[username] || [];
  }

  private getUsersFromLocalStorage(): User[] {
    if (typeof localStorage !== 'undefined') {
      const usersJson = localStorage.getItem("users");
      return usersJson ? JSON.parse(usersJson) : [];
    } else {
      return [];
    }
  }


  private getNotesFromLocalStorage(): { [username: string]: Note[] } {
    if (typeof localStorage !== 'undefined') {
      const notesJson = localStorage.getItem("notes");
      return notesJson ? JSON.parse(notesJson) : {};
    } else {
      return {};
    }
  }


  private saveDataToLocalStorage(): void {
    localStorage.setItem("users", JSON.stringify(this.users));
    localStorage.setItem("notes", JSON.stringify(this.notes));
  }

  public registerUser(username: string, email: string, password: string): void {
    const newUser: User = { username, email, password };
    this.users.push(newUser);
    this.notes[username] = [];
    this.saveDataToLocalStorage();
    console.log(`Пользователь ${username} успешно зарегистрирован.`);
  }

  public userExists(username: string): boolean {
    return this.users.some(user => user.username === username);
  }

  public loginUser(username: string, password: string): boolean {
    const user = this.users.find(user => user.username === username);
    if (user && user.password === password) {
      console.log(`Пользователь ${username} успешно вошел.`);
      localStorage.setItem("current-user", username);
      return true;
    } else {
      console.log(`Пользователь ${username} не найден или неверный пароль.`);
      return false;
    }
  }

  public getCurrentUsername(): string {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem("current-user") || "";
    } else {
      return "";
    }
  }


  public addNote(username: string, note: Note): void {
    if (!this.notes[username]) {
      this.notes[username] = [];
    }
    this.notes[username].push(note);
    this.saveDataToLocalStorage();
    console.log(`Заметка добавлена для пользователя ${username}.`);
  }

  public deleteNote(username: string, index: number): void {
    if (this.notes[username]) {
      this.notes[username].splice(index, 1);
      this.saveDataToLocalStorage();
      console.log(`Заметка удалена для пользователя ${username}.`);
    } else {
      console.log(`Пользователь ${username} не имеет заметок.`);
    }
  }

  public logOut(): void {
    localStorage.removeItem("current-user");
    this.router.navigate(['/login']);
    console.log("Пользователь вышел из системы.");
  }
}
