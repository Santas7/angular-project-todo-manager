import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'ToggleWelcome',
  templateUrl: './toggle-welcome.component.html',
  standalone: true,
  styleUrls: [
    './login.component.css'
  ],
  imports: [
    FormsModule,
    CommonModule
  ]
})
export class ToggleWelcomeComponent {
  isSignDivVisiable: boolean  = false;
}