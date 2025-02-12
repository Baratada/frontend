import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';  // Import Router
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AuthService } from './services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [HttpClientModule, RouterModule, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppComponent {
  title = 'Hospital Management System';
  loginState: boolean = false;
  userRole: string | null = null; 
  userId: string | null = null; 

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Subscribe to login state
    this.authService.loginState$.subscribe(state => {
      this.loginState = state;
    });

    // Subscribe to role changes
    this.authService.role$.subscribe(role => {
      this.userRole = role;
    });

    // Subscribe to user ID changes
    this.authService.userId$.subscribe(userId => {
      this.userId = userId;
      console.log(userId);
    });
  }

  // Logout method
  logout(): void {
    this.authService.logout();  // Call logout method from AuthService
    this.router.navigate(['/']);  // Navigate to the homepage or login page
  }
}
