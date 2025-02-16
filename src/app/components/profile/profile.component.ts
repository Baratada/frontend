// profile.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/userService/user.service';  // Adjust path as needed
import { User } from '../../../app/models/user.model';  // Adjust path as needed
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/authService/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  imports: [CommonModule, FormsModule],
})
export class ProfileComponent implements OnInit {
  user: User | null = null;
  loginState: boolean = false;
  profileUserId: number = 0; // Extracted from the URL
  currentUser:number =  localStorage.getItem('user_id') ? this.profileUserId = +localStorage.getItem('user_id')! : this.profileUserId = -1;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}


  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id')!;  // Get id as string

    this.authService.loginState$.subscribe(loginState => this.loginState = loginState);
    
    if (userId) {
      this.userService.getUserById(userId).subscribe(
        (user) => {
          console.log("User data:", user); // Debugging log
          this.user = user;
        },
        (error) => {
          console.error('Error fetching user', error);
        }
      );
    }

  }

  requestAppointment(): void{

  }

  updateAge() {
    if (this.user && this.user.age >= 0 && this.user.age <= 120) {
      this.userService.updateAge(this.user.id, this.user.age).subscribe(
        (response:any) => {
          console.log('Age updated successfully', response);
        },
        (error:any) => {
          console.error('Error updating age', error);
        }
      );
    } else {
      console.error('Invalid age');
    }
  }

  isProfileOwner(): boolean {
    return this.user?.id === this.profileUserId; // Only allow edits if IDs match
  }
}