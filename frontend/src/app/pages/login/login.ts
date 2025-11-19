import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router'; 
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink], 
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {


  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  public loginForm: FormGroup;
  public loginError: string | null = null; 

  constructor() {
    
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  //  This runs when the form is submitted
  onSubmit(): void {
    this.loginError = null;
    if (this.loginForm.invalid) {
      return;
    }

    this.authService.login(this.loginForm.value).subscribe(
      (response) => {
        // On success navigate to the home page
        console.log('Login successful!', response);
        this.router.navigate(['/home']);
      },
      (error) => {
        console.error('Login failed:', error);
        this.loginError = 'Login failed. Please check your username and password.';
      }
    );
  }
}
