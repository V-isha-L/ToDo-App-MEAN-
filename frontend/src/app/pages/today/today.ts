import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Navbar } from '../../components/navbar/navbar';
import { TodoItemComponent } from '../../components/todo-item/todo-item';
import { Todo } from '../../todo.interface';
import { TodoService } from '../../todo';

@Component({
  selector: 'app-today',
  standalone: true,
 
  imports: [
    CommonModule,
    RouterLink,
    Navbar,
    TodoItemComponent
  ],
  templateUrl: './today.html',
  styleUrl: './today.scss'
})
export class Today implements OnInit {

  private todoService = inject(TodoService);
  public todaysTasks: Todo[] = [];

  ngOnInit(): void {

    this.todoService.todos$.subscribe(
      (allTodos) => {
        this.todaysTasks = this.filterForToday(allTodos);
      }
    );

    this.todoService.loadTodos();
  }

  private filterForToday(todos: Todo[]): Todo[] {
    const today = new Date();
    const todayDate = today.getDate();
    const todayMonth = today.getMonth();
    const todayYear = today.getFullYear();

    return todos.filter(todo => {
      if (!todo.dueDate) {
        return false;
      }
      
      const todoDate = new Date(todo.dueDate);
      
      return todoDate.getDate() === todayDate &&
             todoDate.getMonth() === todayMonth &&
             todoDate.getFullYear() === todayYear;
    });
  }
}