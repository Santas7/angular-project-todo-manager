import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() {}

  registrationUser(signUpObj: any): void {
    const localUsers = localStorage.getItem("todo-local-storage");
    let users = {};
    if (localUsers) {
      users = JSON.parse(localUsers);
    }
    // @ts-ignore
    users[signUpObj.email] = { name: signUpObj.name, password: signUpObj.password, todoList: [] };
    localStorage.setItem("todo-local-storage", JSON.stringify(users));
    alert("Регистрация завершена!");
  }

  loggingInUser(loginObj: any): void {
    const localUsers = localStorage.getItem("todo-local-storage");
    if (localUsers) {
      const users = JSON.parse(localUsers);
      const user = users[loginObj.email];
      if (user && user.password === loginObj.password) {
        localStorage.setItem("loggedUser", JSON.stringify({ email: loginObj.email, name: user.name }));
      } else {
        alert("No User Found :(");
      }
    }
  }

  isRegistered(): boolean {
    return localStorage.getItem("loggedUser") !== null;
  }

  logOut(): void {
    localStorage.removeItem("loggedUser");
  }

  addNote(note: any): void {
    const loggedUser = localStorage.getItem("loggedUser");
    if (loggedUser) {
      const { email } = JSON.parse(loggedUser);
      const localUsers = localStorage.getItem("todo-local-storage");
      if (localUsers) {
        const users = JSON.parse(localUsers);
        if (users[email]) {
          users[email].todoList.push(note);
          localStorage.setItem("todo-local-storage", JSON.stringify(users));
        }
      }
    }
  }

  getTodoList(): any[] {
    const loggedUser = localStorage.getItem("loggedUser");
    if (loggedUser) {
      const { email } = JSON.parse(loggedUser);
      const localUsers = localStorage.getItem("todo-local-storage");
      if (localUsers) {
        const users = JSON.parse(localUsers);
        if (users[email]) {
          return users[email].todoList;
        }
      }
    }
    return [];
  }

  deleteNote(index: number): void {
    const loggedUser = localStorage.getItem("loggedUser");
    if (loggedUser) {
      const { email } = JSON.parse(loggedUser);
      const localUsers = localStorage.getItem("todo-local-storage");
      if (localUsers) {
        const users = JSON.parse(localUsers);
        if (users[email]) {
          users[email].todoList.splice(index, 1);
          localStorage.setItem("todo-local-storage", JSON.stringify(users));
        }
      }
    }
  }
}
