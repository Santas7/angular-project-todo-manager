import { Injectable } from '@angular/core';
import { Store, Note } from '../../bll/store';

@Injectable({
    providedIn: 'root'
})
export class TodoService {

    constructor(private store: Store) { }

    ngOnInit() {
        this.getNotesForCurrentUser();
    }

    getNotesForCurrentUser(): Note[] {
        const username = this.store.getCurrentUsername();
        return this.store.getNotesForUser(username);
    }

    addNoteForCurrentUser(note: Note): void {
        const username = this.store.getCurrentUsername();
        this.store.addNote(username, note);
    }

    deleteNoteForCurrentUser(index: number): void {
        const username = this.store.getCurrentUsername();
        this.store.deleteNote(username, index);
    }
}
