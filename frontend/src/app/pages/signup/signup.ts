import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router'; 
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth'; 

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './signup.html',
  styleUrl: './signup.scss'
})
export class Signup {

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  public signupForm: FormGroup;
  public signupError: string | null = null;
  public signupSuccess: string | null = null;

  constructor() {
   
    this.signupForm = this.fb.group({
      // We'll add a 'confirmPassword' validator later
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }


  onSubmit(): void {
    this.signupError = null;
    this.signupSuccess = null;
    if (this.signupForm.invalid) {
      return;
    }

    this.authService.signup(this.signupForm.value).subscribe(
      (response) => {
        console.log('Signup successful!', response);
        //  On success, show a message and redirect to login
        this.signupSuccess = 'Account created successfully! You can now log in.';
        // We'll redirect after 1.5 seconds
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1500);
      },
      (error) => {
        //  On error
        console.error('Signup failed:', error);
        if (error.error && error.error.message) {
          this.signupError = error.error.message;
        } else {
          this.signupError = 'Signup failed. Please try again.';
        }
      }
    );
  }
}