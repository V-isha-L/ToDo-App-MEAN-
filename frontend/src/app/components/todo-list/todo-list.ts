import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Todo } from '../../todo.interface';
import { TodoService } from '../../todo';
import { TodoItemComponent } from '../todo-item/todo-item';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, TodoItemComponent],
  templateUrl: './todo-list.html',
  styleUrl: './todo-list.scss'
})
export class TodoList implements OnInit {
  
  private todoService = inject(TodoService);
  
  private allTodos: Todo[] = [];      // The original list from the API
  public sortedTodos: Todo[] = [];    // The list displayed in the HTML
  
  //  property to hold the current sort order
  private currentSort: string = 'default';

  // A helper map for sorting by priority
  private priorityMap = { 'High': 3, 'Medium': 2, 'Low': 1 };

  ngOnInit(): void {
    // 4. When the tasks updates...
    this.todoService.todos$.subscribe((data) => {
      this.allTodos = data;     // update the master list
      this.sortTodos();         //  re-sort the display list
    });
    
    this.todoService.loadTodos();
  }

  // This method runs when the <select> changes
  onSortChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.currentSort = value;
    this.sortTodos();
  }

  //  the main sorting logic
  sortTodos(): void {
    // Make a copy of the master list to sort
    let todosToSort = [...this.allTodos];

    switch (this.currentSort) {
      case 'priority-desc':
        todosToSort.sort((a, b) => this.priorityMap[b.priority] - this.priorityMap[a.priority]);
        break;
        
      case 'priority-asc':
        todosToSort.sort((a, b) => this.priorityMap[a.priority] - this.priorityMap[b.priority]);
        break;
        
      case 'due-date':
        todosToSort.sort((a, b) => {
          // Handle null/undefined due dates
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        });
        break;
        
      case 'default':
      default:
        // The API already sends them sorted by newest first (createdAt: -1)
        // So we just use the original list.
        break;
    }

    this.sortedTodos = todosToSort;
  }
}