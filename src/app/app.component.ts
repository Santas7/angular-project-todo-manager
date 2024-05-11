import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store, Note } from '../bll/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private router: Router, private store: Store) {}

  ngOnInit(): void {
    if (!this.store.getCurrentUsername()) {
      this.router.navigate(['/login']);
    }
  }
}
