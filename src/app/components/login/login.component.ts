import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';  // import AuthService
import { Router } from '@angular/router'; // to navigate after logout
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [RouterModule, CommonModule, FormsModule]

})
export class LoginComponent implements OnInit {
  isLoggedIn: boolean = false;
  username: string = '';
  password: string = '';
  loginError: string | null = null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Check login status on component initialization
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  // Login or logout based on the current state
  onAuthButtonClick(): void {
    
      // Login logic here
      // Call the login API and pass the username/password
    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        // If login is successful, update state
        this.isLoggedIn = true;  // Update the state
        this.loginError = null;  // Clear any previous error
        this.router.navigate(['/']);  // Redirect to dashboard
      },
      error: (error) => {
        // Handle login failure (invalid credentials)
        this.loginError = 'Invalid credentials, please try again.';
      }
    });
  }
}
