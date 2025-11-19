import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Todo } from './todo.interface'; 

@Injectable({
  providedIn: 'root'
})
export class TodoService {


  private http = inject(HttpClient);
  
 
  private apiUrl = 'http://localhost:5000/api/todos';

  // 1. This is "bulletin board". It holds the current list of todos.
  private _todos = new BehaviorSubject<Todo[]>([]);

  // 2. This is the public "stream" components can listen to.
  // We use .asObservable() to hide the "write" controls from them.
  public todos$ = this._todos.asObservable();

  // 3. This method fetches from the API and puts the list on the "board".
  loadTodos(): void {
    this.http.get<Todo[]>(this.apiUrl).subscribe(
      (data) => {
        this._todos.next(data); // <-- Push the new list to the board
      },
      (error) => {
        console.error('Error loading todos:', error);
      }
    );
  }

  
  // 4. GET all todos (now just returns the stream)
  // We don't use this one right now, but it's good to have.
  getTodos(): Observable<Todo[]> {
    return this.todos$;
  }


  addTodo(todo: Partial<Todo>): Observable<Todo> {
    return this.http.post<Todo>(this.apiUrl, todo).pipe(
      tap(() => {
        this.loadTodos(); 
      })
    );
  }

  updateTodo(id: string, changes: Partial<Todo>): Observable<Todo> {
    return this.http.put<Todo>(`${this.apiUrl}/${id}`, changes).pipe(
      tap(() => {
        this.loadTodos(); // <-- Reload the list after an update
      })
    );
  }

  deleteTodo(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        this.loadTodos(); 
      })
    );
  }
}