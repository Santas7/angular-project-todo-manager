import { Component, OnInit } from '@angular/core';
import { ServerService } from '../../bll/store';
import {FormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {HomeComponent} from "../../common/Preloader/preloader.component";

@Component({
    selector: 'app-todo',
    templateUrl: './todo.component.html',
    standalone: true,
    imports: [
        FormsModule,
        NgForOf,
        HomeComponent,
        NgIf
    ]
})
export class TodoComponent implements OnInit {
    notes: any[] = [];
    title: string = '';
    text: string = '';
    loading: boolean = true;

    constructor(private serverService: ServerService) { }

    ngOnInit(): void {
        setTimeout(()=>{
            this.loading = false;
            this.loadNotes();
        }, 500);

    }

    loadNotes(): void {
        this.serverService.getNotes().subscribe(
            (data: any) => {
                this.notes = data.notes;
                console.log('Notes:', this.notes); // Log the notes array
            },
            (error: any) => {
                console.error('Error fetching notes:', error);
            }
        );
    }


    addNote(): void {
        this.serverService.addNote(this.title, this.text, 1).subscribe(
            (data: any) => {
                console.log('Note added successfully:', data);
                this.loadNotes(); // Refresh the notes list after adding a new note
                this.title = ''; // Clear input fields
                this.text = '';
            },
            (error: any) => {
                console.error('Error adding note:', error);
            }
        );
    }
    editNote(note: any): void {
        const updatedTitle = prompt('Enter the updated title:', note.title);
        const updatedText = prompt('Enter the updated text:', note.text);
        const updatedStatus = prompt('Enter the updated status:', note.status);

        if (updatedTitle && updatedText && updatedStatus) {
            this.serverService.updateNote(note[0], updatedTitle, updatedText, updatedStatus).subscribe(
                (data: any) => {
                    console.log('Note updated successfully:', data);
                    this.loadNotes(); // Refresh the notes list after updating a note
                },
                (error: any) => {
                    console.error('Error updating note:', error);
                }
            );
        } else {
            console.log('Update canceled');
        }
    }

    deleteNote(noteId: number): void {
        this.serverService.deleteNote(noteId).subscribe(
            (data: any) => {
                console.log('Note deleted successfully:', data);
                this.loadNotes(); // Refresh the notes list after deleting a note
            },
            (error: any) => {
                console.error('Error deleting note:', error);
            }
        );
    }
}
