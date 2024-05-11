import { Component, OnInit } from '@angular/core';
import { Store, Note, User } from '../../bll/store';

@Component({
    selector: 'app-todo',
    templateUrl: './todo.component.html',
    standalone: true,
    styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
    notes: Note[] = [];
    newNote: Note = {
        title: '',
        text: '',
        status: 'pending'
    };

    constructor(private store: Store) { }

    ngOnInit(): void {
        // Call the method to fetch notes for the current user
        this.fetchNotes();
    }

    fetchNotes(): void {
        this.store.getCurrentUser().subscribe((user: User) => {
            if (user) {
                this.store.getNotesForUser(user.id!).subscribe(notes => {
                    this.notes = notes;
                });
            }
        });
    }

    addNote(): void {
        if (this.newNote.title.trim() && this.newNote.text.trim()) {
            this.store.addNote(this.newNote).subscribe(() => {
                this.fetchNotes(); // Refresh the notes after adding
                this.newNote = {
                    title: '',
                    text: '',
                    status: 'pending'
                };
            });
        }
    }

    deleteNote(noteId: number): void {
        this.store.deleteNote(noteId).subscribe(() => {
            this.fetchNotes(); // Refresh the notes after deleting
        });
    }

    updateNoteStatus(note: Note): void {
        this.store.updateNote(note).subscribe(() => {
            this.fetchNotes(); // Refresh the notes after updating
        });
    }
}
