import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "../components/Home/home.component";
import { TodoComponent } from "../components/ToDo/todo.component";
import { LoginComponent } from "../components/Login/login.component";
import { SignInComponent } from "../components/SignIn/signin.component";
import { CaptchaComponent } from "../components/Captcha/captcha.component";



export const isRegistered = () => {
  const localUsers = localStorage.getItem("loggedUser");
  console.log(localUsers);
  return localUsers !== null;
}

// Определение маршрутов должно происходить после экспорта isRegistered
const routes: Routes = isRegistered() ? [
  { path: '', component: HomeComponent },
  { path: 'todo', component: TodoComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signin', component: SignInComponent },
  { path: 'captcha', component: CaptchaComponent },
] : [{ path: 'login', component: LoginComponent }];

// Теперь экспортируем определенные маршруты
export { routes };
