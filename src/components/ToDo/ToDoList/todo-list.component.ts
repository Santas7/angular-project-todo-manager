import { Component, OnInit } from '@angular/core';
import { TodoService } from '../todo.service';
import {TodoItemComponent} from "./ToDoItem/todo-item.component";
import {NgForOf} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'TodoList',
  templateUrl: './todo-list.component.html',
  standalone: true,
  imports: [
    TodoItemComponent,
    NgForOf,
    FormsModule
  ],
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  todoList: string[] = [];
  newTodo: string = '';

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.todoService.getTodoList().subscribe(todoList => {
      this.todoList = todoList;
    });
  }

  addTodo() {
    if (this.newTodo.trim()) {
      this.todoService.addTodo(this.newTodo.trim());
      this.newTodo = '';
    }
  }
}
