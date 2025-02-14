import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';  // Import the UserService
import { User } from '../../models/user.model';  // Import the User model
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
  imports: [CommonModule, FormsModule]
})
export class AdminDashboardComponent implements OnInit {
  users: User[] = [];  // Define the users array with the User type
  selectedRole: string = 'user';

  constructor(
    private userService: UserService,  // Inject the UserService
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.userService.getUsers().subscribe(
      (users) => {
        this.users = users;  // Update the users array with the fetched data
      },
      (error) => {
        alert(`Failed to load users: ${error}`);
      }
    );
  }

  updateRole(userId: number, role: string): void {
    console.log(`Updating role for userId: ${userId} to role: ${role}`);  // Add logging
    this.userService.updateRole(userId, role).subscribe(
      (response) => {
        alert(response.message);
        this.fetchUsers();  // Refresh the list of users
      },
      (error) => {
        alert(`Failed to update role: ${error}`);
      }
    );
  }

  updateSpecialization(userId: number, specialization: string): void {
    console.log(`Updating specialization for userId: ${userId} to specialization: ${specialization}`);  // Add logging
    this.userService.updateSpecialization(userId, specialization).subscribe(
      (response) => {
        alert(response.message);
        this.fetchUsers();  // Refresh the list of users
      },
      (error) => {
        alert(`Failed to update specialization: ${error}`);
      }
    );
  }

  deleteUser(userId: number): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(userId).subscribe(
        (response) => {
          alert(response.message);
          this.fetchUsers();  // Refresh the list of users
        },
        (error) => {
          alert('Failed to delete user');
        }
      );
    }
  }
}
