// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // добавьте это

import { AppComponent } from './app.component';

import {RouterModule} from "@angular/router";
import {HomeComponent} from "../components/Home/home.component";
import {HeaderComponent} from "../components/Header/header.component";
import {AppRoutingModule} from "./app-routing.module";
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
    HeaderComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }