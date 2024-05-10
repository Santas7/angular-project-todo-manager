import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from '../../bll/store';

@Injectable({
    providedIn: 'root'
})
export class TodoService {
    private todoListSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
    public todoList$: Observable<any[]> = this.todoListSubject.asObservable();

    constructor(private authService: AuthService) {
        const initialData = this.authService.getTodoList();
        this.setTodoList(initialData);
    }

    public setTodoList(todoList: any[]): void {
        this.todoListSubject.next(todoList);
    }

    public addTodo(todo: string): void {
        const currentList = this.todoListSubject.value;
        const updatedList = [...currentList, { text: todo, title: '', status: false }];
        this.todoListSubject.next(updatedList);
        this.authService.addNote({ text: todo, title: '', status: false }); // Добавляем заметку в todoList в localStorage
    }

    public deleteTodo(todo: any): void {
        const currentList = this.todoListSubject.value;
        const updatedList = currentList.filter(item => item !== todo);
        this.todoListSubject.next(updatedList);
        this.authService.deleteNote(currentList.indexOf(todo));
    }

    public getTodoList(): Observable<any[]> {
        return this.todoList$;
    }
}
