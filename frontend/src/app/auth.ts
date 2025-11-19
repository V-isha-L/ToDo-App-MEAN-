import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'; 
import { Observable, tap } from 'rxjs'; 

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);
  private router = inject(Router);

  private apiUrl = 'http://localhost:5000/api/auth';
  private tokenKey = 'auth_token'; // The key we'll use in localStorage

  // --- 1. Sign Up ---

  signup(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, credentials);
  }

  // --- 2. Log In ---
  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: any) => {
        if (response && response.token) {
          this.saveToken(response.token);
        }
      })
    );
  }

  // --- 3. Log Out ---
  logout(): void {
    this.removeToken(); // Remove token from storage
    this.router.navigate(['/login']);
  }

  
  saveToken(token: string): void {
    // localStorage is the browser's simple storage
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  removeToken(): void {
    localStorage.removeItem(this.tokenKey);
  }


  isLoggedIn(): boolean {
    const token = this.getToken();
    // we will also make it to check if it's expired in future
    return !!token; 
  }
}