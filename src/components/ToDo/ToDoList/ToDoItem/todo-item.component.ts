import {Component, Input} from "@angular/core";
import {TodoService} from "../../todo.service";

@Component({
  selector: 'TodoItem',
  templateUrl: './todo-item.component.html',
  standalone: true,
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent {
  @Input() todo?: string;

  constructor(private todoService: TodoService) { }

  editTodo(): void {
    // Реализуйте логику для редактирования todo
  }

  deleteTodo(): void {
    this.todoService.deleteTodo(this.todo);
  }
}
