// src/app/components/users/users.component.ts
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/userService/user.service';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';  // Ensure the correct import path
import { CommonModule } from '@angular/common';  // Import CommonModule for async pipe
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-users',  // Component selector
  templateUrl: './doctors.component.html',  // Updated HTML path
  styleUrls: ['./doctors.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule]  // Add CommonModule here to make async pipe available
})
export class DoctorsComponent implements OnInit {
  users$: Observable<User[]> = new Observable<User[]>();  // Observable to hold the users

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.users$ = this.userService.getUsers();  // Fetch all users from the service
  }
}
