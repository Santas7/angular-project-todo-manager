import {Component} from "@angular/core";
import {TodoItemComponent} from "./ToDoItem/todo-item.component";

@Component({
  selector: 'TodoList',
  templateUrl: './todo-list.component.html',
  standalone: true,
  imports: [
    TodoItemComponent
  ],
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent {}
