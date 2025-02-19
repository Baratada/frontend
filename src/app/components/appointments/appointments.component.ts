import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../../services/appointmentService/appointment.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User } from '../../models/user.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css'],
  imports: [FormsModule, CommonModule, RouterModule],
})
export class AppointmentsComponent implements OnInit {
  appointments: any[] = [];
  loading = true;
  userId: number = 0;
  constructor(private appointmentService: AppointmentService) {}

  ngOnInit(): void {
    this.userId = Number(localStorage.getItem('user_id')) || 0;
    this.fetchAppointments();
  }

  fetchAppointments(): void {
    this.appointmentService.getAppointments().subscribe(
      (data: any[]) => {
        this.appointments = data;
        this.loading = false;
      },
      (error: any) => {
        console.error('Error fetching appointments:', error);
        this.loading = false;
      }
    );
  }
  
  acceptAppointment(id: number): void {
    this.appointmentService.updateAppointment(id, 'confirmed').subscribe(() => {
      this.appointments = this.appointments.filter((appt) => appt.id !== id);
    });
    this.fetchAppointments();
  }
  deleteAppointment(id: number): void {
    if (confirm('Are you sure you want to delete this appointment?')) {
      this.appointmentService.deleteAppointment(id).subscribe(() => {
        this.appointments = this.appointments.filter((appt) => appt.id !== id);
      });
    }
  }
}
