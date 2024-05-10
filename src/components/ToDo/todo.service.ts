import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from '../../bll/store';

@Injectable({
    providedIn: 'root'
})
export class TodoService {
    private todoListSubject: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
    public todoList$: Observable<string[]> = this.todoListSubject.asObservable();

    constructor(private authService: AuthService) {
        const initialData = this.authService.getTodoList();
        this.setTodoList(initialData);
    }

    public setTodoList(todoList: string[]): void {
        this.todoListSubject.next(todoList);
    }

    public addTodo(todo: string): void {
        const currentList = this.todoListSubject.value;
        const updatedList = [...currentList, todo];
        this.todoListSubject.next(updatedList);
        this.authService.addNote(todo); // Добавляем заметку в todoList в localStorage
    }

    public deleteTodo(todo: string | undefined): void {
        const currentList = this.todoListSubject.value;
        const updatedList = currentList.filter(item => item !== todo);
        this.todoListSubject.next(updatedList);
        if (todo != null) {
            this.authService.deleteNote(currentList.indexOf(todo));
        } // Удаляем заметку из todoList в localStorage
    }

    public getTodoList(): Observable<string[]> {
        return this.todoList$;
    }
}
