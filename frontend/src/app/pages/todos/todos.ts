import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TodoList } from '../../components/todo-list/todo-list';
import { Navbar } from '../../components/navbar/navbar';

@Component({
  selector: 'app-todos',
  standalone: true,

  imports: [CommonModule, RouterLink, TodoList,Navbar],
  templateUrl: './todos.html',
  styleUrl: './todos.scss'
})
export class Todos {
  // This page is also just a container
}