import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TodoService {
    private todoListSubject: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
    public todoList$: Observable<string[]> = this.todoListSubject.asObservable();

    constructor() {
        // Предположим, что данные изначально приходят из bll store.ts и передаются сюда
        const initialData: string[] = ["ToDo 1", "ToDo 2", "ToDo 3"];
        this.setTodoList(initialData);
    }

    public setTodoList(todoList: string[]): void {
        this.todoListSubject.next(todoList);
    }

    public addTodo(todo: string): void {
        const currentList = this.todoListSubject.value;
        const updatedList = [...currentList, todo];
        this.todoListSubject.next(updatedList);
    }

    public deleteTodo(todo: string | undefined): void {
        const currentList = this.todoListSubject.value;
        const updatedList = currentList.filter(item => item !== todo);
        this.todoListSubject.next(updatedList);
    }

    public getTodoList(): Observable<string[]> {
        return this.todoList$;
    }
}
