// todo-list.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent {
  @Input() todos: string[] = [];
  @Output() delete: EventEmitter<number> = new EventEmitter<number>();

  deleteTodo(index: number): void {
    this.delete.emit(index);
  }
}
