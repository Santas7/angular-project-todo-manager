// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // добавьте это
import { AppComponent } from './app.component';
import { LoginComponent } from '../components/Login/login.component';
import {RouterModule} from "@angular/router";
import {HomeComponent} from "../components/Home/home.component";
import {HeaderComponent} from "../components/Header/header.component";
import {AppRoutingModule} from "./app-routing.module";
import {TodoItemComponent} from "../components/ToDo/ToDoList/ToDoItem/todo-item.component";
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    RouterModule,
    HomeComponent,
    HeaderComponent,
    TodoItemComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
