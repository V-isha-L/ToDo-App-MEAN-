import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TodoService } from '../../todo'; 

@Component({
  selector: 'app-add-todo-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-todo-form.html',
  styleUrl: './add-todo-form.scss'
})
export class AddTodoForm {

  public successMessage: string | null = null;
  public errorMessage: string | null = null;

  
  private fb = inject(FormBuilder);
  private todoService = inject(TodoService);

  //  Create the FormGroup
  public todoForm: FormGroup;

  constructor() {
    // Define the form's structure and validators
    this.todoForm = this.fb.group({
      taskName: ['', Validators.required], // taskName is required
      priority: ['Medium'], // Default value
      dueDate: [null]
    });
  }

  onSubmit(): void {
    // Resets MESSAGES on every new submit
    this.successMessage = null;
    this.errorMessage = null;

    if (this.todoForm.invalid) {
      //  Sets a specific error if the form is invalid
      this.errorMessage = "Task name is required.";
      return; 
    }

    this.todoService.addTodo(this.todoForm.value).subscribe(
      (newTodo) => {
        // SET SUCCESS MESSAGE
        this.successMessage = 'Todo added successfully!';
        this.todoForm.reset({
          taskName: '',
          priority: 'Medium',
          dueDate: null
        });
        
        //  Clear the success message after 3 seconds
        setTimeout(() => {
          this.successMessage = null;
        }, 3000);
      },
      (error) => {
        // SET ERROR MESSAGE
        console.error('Error adding todo:', error);
        this.errorMessage = 'Failed to add todo. Please try again.';
      }
    );
  }
}