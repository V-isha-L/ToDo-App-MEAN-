import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router'; 
import { AuthService } from '../../auth'; 

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterLink], 
  templateUrl: './profile.html',
  styleUrl: './profile.scss'
})
export class Profile {
  
  private authService = inject(AuthService);

  onLogout(): void {
    this.authService.logout();
  }

  onChangePassword(): void {
   
    alert('Change password functionality is not yet implemented.');
  }
}
