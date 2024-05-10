import { Injectable } from '@angular/core';
import { SignUpModel, LoginModel } from '../components/Login/login.component';
import { Router } from '@angular/router';
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

export const registrationUser=(signUpObj:any)=>{
  const localUser = localStorage.getItem("todo-local-storage");
  if(localUser != null) {
    const users =  JSON.parse(localUser);
    users.push(signUpObj);
    localStorage.setItem("todo-local-storage", JSON.stringify(users));
  }
  else{
    const users = [];
      users.push(signUpObj);
      localStorage.setItem("todo-local-storage", JSON.stringify(users));
  }
  alert("Регистрация завершена!");
}

export const loggingInUser=(loginObj:any, router: Router)=>{
  const localUsers =  localStorage.getItem("todo-local-storage")
    if(localUsers != null) {
      const users =  JSON.parse(localUsers);

      const isUserPresent =  users.find( (user:SignUpModel)=> user.email == loginObj.email && user.password == loginObj.password);
      if(isUserPresent != undefined) {
        localStorage.setItem("loggedUser", JSON.stringify(isUserPresent));
        router.navigate(['/todo']);
      } else {
        alert("No User Found :(")
      }
    }
}

export const isRegistered = () => {
  const localUsers = localStorage.getItem("loggedUser");
  console.log(localUsers);
  return localUsers !== null;
}

export const logOut = () => {
  localStorage.removeItem("loggedUser");
}