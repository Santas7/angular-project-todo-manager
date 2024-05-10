import { Component, OnInit } from '@angular/core';
import { Store, Note } from '../../bll/store';
import {FormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf
  ],
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  notes: Note[] = [];
  newNoteTitle: string = '';
  newNoteText: string = '';

  constructor(private store: Store) { }

  ngOnInit(): void {
    debugger;
    this.loadNotes();
  }

  loadNotes(): void {
    const username = this.store.getCurrentUsername();
    if (username) {
      this.notes = this.store.getNotesForUser(username);
    }
  }

  addNote(): void {
    const username = this.store.getCurrentUsername();
    const newNote: Note = {
      title: this.newNoteTitle,
      text: this.newNoteText,
      status: 'active'
    };

    this.store.addNote(username, newNote);
    this.notes.push(newNote);
    this.newNoteTitle = '';
    this.newNoteText = '';
  }

  deleteNote(index: number): void {
    const username = this.store.getCurrentUsername();
    this.store.deleteNote(username, index);
    this.notes.splice(index, 1);
  }

}
