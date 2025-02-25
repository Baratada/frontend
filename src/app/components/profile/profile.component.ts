import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/userService/user.service';  // Adjust path as needed
import { Drug, User } from '../../models/user.model';  // Added Appointment model import
import { Appointment } from '../../models/appointment.model';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/authService/auth.service';
import { FormsModule } from '@angular/forms';
import { AppointmentService } from '../../services/appointmentService/appointment.service';
import { DrugService } from '../../services/drugSerivce/drugs.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  imports: [CommonModule, FormsModule, RouterModule],
})
export class ProfileComponent implements OnInit {
  user!: User;
  currentUser!: User;
  loginState: boolean = false;
  profileUserId: number = 0; // Extracted from the URL
  appointmentDate: string = '';
  currentUserId: number =  localStorage.getItem('user_id') ? +localStorage.getItem('user_id')! : -1;

  drugs$!: Observable<Drug[]>;
  newDrug!: Drug;
  appointments$!: Observable<Appointment[]>;  // Appointments array

  // Set minimum date (today)
  minDate: string = new Date().toISOString().split('T')[0];

  constructor(
    private userService: UserService,
    private drugService: DrugService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private appointmentService: AppointmentService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id')!;  // Get id as string

    this.authService.loginState$.subscribe(loginState => this.loginState = loginState);
    
    // Fetch user data from the URL parameter (profile user) and current user
    if (userId) {
      this.profileUserId = +userId;  // Set profileUserId from the URL param
    }

    // Fetch the profile user and the current user
    this.userService.getUserById(String(this.profileUserId)).subscribe(
      (user) => {
        console.log("User data:", user); // Debugging log
        this.user = user;
      },
      (error) => {
        console.error('Error fetching user', error);
      }
    );

    this.userService.getUserById(String(this.currentUserId)).subscribe(
      (user) => {
        console.log("Current user data:", user); // Debugging log
        this.currentUser = user;
      },
      (error) => {
        console.error('Error fetching current user', error);
      }
    );

    this.drugs$ = this.drugService.getDrugs();

    // Fetch appointments of the user
    this.appointments$ = this.appointmentService.getAppointmentsForUser(this.currentUserId);  // Fetch user-specific appointments
  }

  navigateToAppointment(appointmentId: number): void {
    // Navigate to the detailed appointment page
    this.router.navigate(['/appointment', appointmentId]);
  }

  isProfileOwner(): boolean {
    return this.user?.id === this.profileUserId; // Only allow edits if IDs match
  }

  isUserDoctor(): boolean {
    return this.currentUser?.role == 'doctor';
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
      patient_id: this.currentUserId,
      doctor_id: this.user.id, // The profile being viewed (doctor)
      appointment_date: isoDate, // Use the ISO formatted date
      reason: prompt("Enter reason for appointment:"),
    };

    this.appointmentService.createAppointment(appointment).subscribe(
      (response) => {
        console.log('Appointment booked successfully', response);
        alert('Appointment booked successfully!');
      },
      (error) => {
        console.error('Error booking appointment', error);
        alert('Error booking appointment. Please try again.');
      }
    );
  }

  assignDrug() {
    if (!this.newDrug || !this.newDrug.id) {
      console.error('No drug selected or invalid drug data');
      return;
    }

    this.userService.updateDrug(this.user.id, [this.newDrug.id!, this.newDrug.name]).subscribe(
      (response) => {
        console.log("Drug assignment response:", response);
        alert('Drug assigned successfully!');
        location.reload();  // Reload to reflect the changes
      },
      (error) => {
        console.error("Error updating drug:", error);
        alert('Error assigning drug. Please try again.');
      }
    );
  }
}
