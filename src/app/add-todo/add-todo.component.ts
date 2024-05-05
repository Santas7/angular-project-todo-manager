// add-todo.component.ts
import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css']
})
export class AddTodoComponent {
  newTodo: string = '';
  @Output() add: EventEmitter<string> = new EventEmitter<string>();

  addTodo(): void {
    if (this.newTodo.trim() !== '') {
      this.add.emit(this.newTodo);
      this.newTodo = '';
    }
  }
}
