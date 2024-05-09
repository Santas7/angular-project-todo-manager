import { Component, OnInit } from '@angular/core';
import { TodoService } from '../todo.service';
import {TodoItemComponent} from "./ToDoItem/todo-item.component";
import {NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {HomeComponent} from "../../../common/Preloader/preloader.component";

@Component({
  selector: 'TodoList',
  templateUrl: './todo-list.component.html',
  standalone: true,
  imports: [
    TodoItemComponent,
    NgForOf,
    FormsModule,
    NgIf,
    HomeComponent
  ],
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  todoList: string[] = [];
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
}
