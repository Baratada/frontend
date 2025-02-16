import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService } from '../../services/userService/user.service';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/authService/auth.service';
import { RouterModule, Router } from '@angular/router';  // Import Router
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
   constructor(
      private userService: UserService,  // Inject the UserService
      private authService: AuthService,  // Inject the AuthService
      private router: Router,
    ){}
  userId: string | null = null;
  userRole: string | null = null;
  loginState: boolean = false;
  
  ngOnInit(): void {
    this.authService.userId$.subscribe(userId => this.userId = userId);
    this.authService.role$.subscribe(role => this.userRole = role);
    this.authService.loginState$.subscribe(loginState => this.loginState = loginState);
  }

  logout(): void {
    this.authService.logout();  // Call logout method from AuthService
    this.router.navigate(['/']);  // Navigate to the homepage or login page
  }

}