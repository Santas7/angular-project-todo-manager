import { Component, OnInit } from '@angular/core';
import { TodoService } from '../todo.service';
import {FormsModule} from "@angular/forms";
import {TodoItemComponent} from "./ToDoItem/todo-item.component";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'TodoList',
  templateUrl: './todo-list.component.html',
  standalone: true,
  imports: [
    FormsModule,
    TodoItemComponent,
    NgForOf
  ],
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  todoList: any[] = [];
  newTodo: string = '';
  loading: boolean = true;

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.todoService.getTodoList().subscribe(todoList => {
      setTimeout(()=>{
        this.todoList = todoList;
        this.loading = false;
        console.log(this.loading);
      }, 500);
    });
  }

  addTodo() {
    if (this.newTodo.trim()) {
      this.todoService.addTodo(this.newTodo.trim());
      this.newTodo = '';
    }
  }

  deleteTodo(todo: any) {
    this.todoService.deleteTodo(todo.text);
  }
}
