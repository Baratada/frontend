// profile.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/userService/user.service';  // Adjust path as needed
import { User } from '../../../app/models/user.model';  // Adjust path as needed
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/authService/auth.service';
import { FormsModule } from '@angular/forms';
import { AppointmentService } from '../../services/appointmentService/appointment.service';

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
   // Variable for storing the selected date
   appointmentDate: string = '';

   // Set minimum date (today)
   minDate: string = new Date().toISOString().split('T')[0];

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private appointmentService: AppointmentService
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

  bookAppointment(): void {
    if (!this.user || this.user.role !== 'doctor') {
      console.error("Cannot book an appointment. The selected user is not a doctor.");
      return;
    }

    if (!this.appointmentDate) {
      console.error("Please select a valid appointment date.");
      return;
    }

    // Convert date to ISO format
    const isoDate = new Date(this.appointmentDate).toISOString();
    
    const appointment = {
      patient_id: this.currentUser,
      doctor_id: this.user.id, // The profile being viewed (doctor)
      appointment_date: isoDate, // Use the ISO formatted date
    };



    this.appointmentService.createAppointment(appointment).subscribe(
      (response) => {
        console.log('Appointment booked successfully', response);
      },
      (error) => {
        console.error('Error booking appointment', error);
      }
    );
  }
  

}
