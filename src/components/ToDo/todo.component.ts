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
    currentFilter: string = '';

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
        const confirmation = confirm('Вы уверены, что хотите удалить эту заметку?');
        if (confirmation) {
            this.serverService.deleteNote(noteId).subscribe(
                (data: any) => {
                    console.log('Note deleted successfully:', data);
                    this.loadNotes(); // Refresh the notes list after deleting a note
                },
                (error: any) => {
                    console.error('Error deleting note:', error);
                }
            );
        } else {
            console.log('Delete canceled');
        }
    }
    applyFilter(filter: string): void {
        this.currentFilter = filter; // сохраняем текущий фильтр
        
        if (filter === 'alphabetical_asc') {
          this.sortAlphabetically('asc');
        } else if (filter === 'alphabetical_desc') {
          this.sortAlphabetically('desc');
        }
      }

    private sortAlphabetically(order: 'asc' | 'desc'): void {
        let filteredNotes = [...this.notes];

        // Сортировка заметок по алфавиту
        filteredNotes = filteredNotes.sort((a, b) => {
            const titleA = a[2].toUpperCase();
            const titleB = b[2].toUpperCase();
            if (order === 'asc') {
                return titleA.localeCompare(titleB);
            } else {
                return titleB.localeCompare(titleA);
            }
        });

        // Присвоение отфильтрованных и отсортированных заметок обратно this.notes
        this.notes = filteredNotes;
    }
}
