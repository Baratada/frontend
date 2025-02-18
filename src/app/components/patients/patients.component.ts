import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/userService/user.service';
import { User } from '../../models/user.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss'],
  imports: [FormsModule, CommonModule, RouterModule]
})
export class PatientsComponent implements OnInit {
  users!: User[];
  loading: boolean = true;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(
      (users) => {
        this.users = users;  // Fetch all users from the service
        this.loading = false;
      },
      (error) => {
        alert(`Failed to load users: ${error}`);
        this.loading = false;
      }
    );
  }

}

