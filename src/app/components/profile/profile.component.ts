// profile.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { UserService } from '../../services/userService/user.service';  // Adjust path as needed
import { Drug, User } from '../../../app/models/user.model';  // Adjust path as needed
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
  currentUserId: number =  localStorage.getItem('user_id') ? this.profileUserId = +localStorage.getItem('user_id')! : this.profileUserId = -1;

  drugs$!: Observable<Drug[]>;
  newDrug!: Drug;

   // Set minimum date (today)
  minDate: string = new Date().toISOString().split('T')[0];

  constructor(
    private userService: UserService,
    private drugService: DrugService,
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

    if (userId) {
      this.userService.getUserById(String(this.currentUserId)).subscribe(
        (user) => {
          console.log("User data:", user); // Debugging log
          this.currentUser = user;
        },
        (error) => {
          console.error('Error fetching user', error);
        }
      );
    }

    this.drugs$ = this.drugService.getDrugs();
  }



  isProfileOwner(): boolean {
    return this.user?.id === this.profileUserId; // Only allow edits if IDs match
  }

  isUserDoctor(): boolean{
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

  assignDrug() {
    this.userService.updateDrug(this.user.id, [this.newDrug.id!, this.newDrug.name]).subscribe(response => {
        console.log("Drug assignment response:", response);
        location.reload();
    }, error => {
        console.error("Error updating stock:", error);
    });
  }
  

}
