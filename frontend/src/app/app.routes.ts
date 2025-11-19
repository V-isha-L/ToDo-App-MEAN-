import { Routes } from '@angular/router';
import { authGuard } from './auth.gaurd';

// Page Components
import { Login } from './pages/login/login';
import { Signup } from './pages/signup/signup';
import { HomeComponent } from './pages/home/home';
import { Profile } from './pages/profile/profile';
import { Todos } from './pages/todos/todos';
import { AddTodo } from './pages/add-todo/add-todo';
import { Today } from './pages/today/today';

export const routes: Routes = [
  // Auth routes (no guard)
  { path: 'login', component: Login },
  { path: 'signup', component: Signup },

  // App routes (all protected by the guard)
  { path: 'home', component: HomeComponent, canActivate: [authGuard] },
  { path: 'profile', component: Profile, canActivate: [authGuard] },
  { path: 'your-todos', component: Todos, canActivate: [authGuard] },
  { path: 'add-todo', component: AddTodo, canActivate: [authGuard] },
  { path: 'today', component: Today, canActivate: [authGuard] },
  
  // Redirects
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Go to dashboard first
  { path: '**', redirectTo: '/home' } // Catch-all
];