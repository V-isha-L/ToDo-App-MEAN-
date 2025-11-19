import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from './auth'; // (or auth.ts)

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // 1. Check if the user is logged in
  if (authService.isLoggedIn()) {
    return true; // Yes, they can access the page
  }

  // 2. If not logged in, redirect them to the /login page
  router.navigate(['/login']);
  return false; // No, they cannot access the page
};