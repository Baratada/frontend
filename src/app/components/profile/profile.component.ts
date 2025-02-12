// profile.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../app/services/user.service';  // Adjust path as needed
import { User } from '../../../app/models/user.model';  // Adjust path as needed
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  imports: [CommonModule]
})
export class ProfileComponent implements OnInit {
  user: User | null = null;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id')!;  // Get id as string
    if (userId) {
      this.userService.getUserById(userId).subscribe(
        (user) => {
          this.user = user;
        },
        (error) => {
          console.error('Error fetching user', error);
        }
      );
    }
  }
}