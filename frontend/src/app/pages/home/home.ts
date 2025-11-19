import { Component ,inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth';
import { Router,RouterLink } from '@angular/router';
import { Navbar } from '../../components/navbar/navbar';
import { TodoService } from '../../todo';

import { AddTodoForm } from '../../components/add-todo-form/add-todo-form';
import { TodoList } from '../../components/todo-list/todo-list';
import { Todo } from '../../todo.interface';

@Component({
  selector: 'app-home',
  standalone: true,

  imports: [CommonModule, RouterLink,Navbar],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class HomeComponent {
  private authService = inject(AuthService);
  private todoService = inject(TodoService);
  private router = inject(Router);

  onQuickAdd(taskName: string): void {
    
    const newTodo: Partial<Todo> = {
      taskName: taskName,
      priority: 'Low',
      dueDate: new Date()
    };

    this.todoService.addTodo(newTodo).subscribe(
      () => {
        //  On success, go to the 'Your Todos' page
        this.router.navigate(['/your-todos']);
      },
      (err) => {
        console.error('Error adding quick-todo:', err);
        alert('Could not add the task. Please try again.');
      }
    );
  }

  onLogout(): void {
    this.authService.logout();
  }

}