// src/app/components/register/register.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../../services/authService/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';  // Import FormsModule

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  imports: [FormsModule]
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  birth_date: Date = new Date();
  maxDate: string = new Date().toISOString().split('T')[0];

  
  constructor(private authService: AuthService, private router: Router) {}
  
  register(): void {
    this.authService.register(this.username, this.password, this.email, this.birth_date).subscribe(
      (response) => {
        console.log('User registered successfully', response);
        this.router.navigate(['/login']);  // Redirect to login page after registration
      },
      (error) => {
        console.error('Registration failed', error);
      }
    );
  }
}
