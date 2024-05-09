import {Component} from "@angular/core";
import {TodoListComponent} from "./ToDoList/todo-list.component";

@Component({
  selector: 'Todo',
  templateUrl: './todo.component.html',
  standalone: true,
    imports: [
        TodoListComponent
    ],
  styleUrls: ['./todo.component.css']
})
export class TodoComponent {}
