import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private router: Router) {}

  registrationUser(signUpObj: any): void {
    const localUser = localStorage.getItem("todo-local-storage");
    let users = [];
    if (localUser) {
      users = JSON.parse(localUser);
    }
    users.push(signUpObj);
    localStorage.setItem("todo-local-storage", JSON.stringify(users));
    alert("Регистрация завершена!");
  }

  loggingInUser(loginObj: any): void {
    const localUsers = localStorage.getItem("todo-local-storage");
    if (localUsers) {
      const users = JSON.parse(localUsers);
      const isUserPresent = users.find((user: any) => user.email === loginObj.email && user.password === loginObj.password);
      if (isUserPresent) {
        localStorage.setItem("loggedUser", JSON.stringify(isUserPresent));
        this.router.navigate(['/todo']);
      } else {
        alert("No User Found :(");
      }
    }
  }

  isRegistered(): boolean {
    const localUsers = localStorage.getItem("loggedUser");
    return localUsers !== null;
  }

  logOut(): void {
    if (localStorage.getItem("loggedUser")) {
      localStorage.removeItem("loggedUser");
      this.router.navigate(['/login']);
    }
  }

  // Добавление заметки в todoList
  addNote(note: any): void {
    const todoList = this.getTodoList();
    todoList.push(note);
    localStorage.setItem("todoList", JSON.stringify(todoList));
  }

  // Получение todoList из localStorage
  getTodoList(): any[] {
    const todoListString = localStorage.getItem("todoList");
    return todoListString ? JSON.parse(todoListString) : [];
  }

  // Изменение заметки в todoList
  updateNote(index: number, updatedNote: any): void {
    const todoList = this.getTodoList();
    todoList[index] = updatedNote;
    localStorage.setItem("todoList", JSON.stringify(todoList));
  }

  // Удаление заметки из todoList
  deleteNote(index: number): void {
    const todoList = this.getTodoList();
    todoList.splice(index, 1);
    localStorage.setItem("todoList", JSON.stringify(todoList));
  }
}
