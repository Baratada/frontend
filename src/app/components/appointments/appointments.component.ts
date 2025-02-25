import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../../services/appointmentService/appointment.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { WritePaperDialogComponent } from '../write-paper-dialog/write-paper-dialog.component';

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
  doctorId: number = 0;
  constructor(private appointmentService: AppointmentService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.userId = Number(localStorage.getItem('user_id')) || 0;
    this.fetchAppointments();
  }

  fetchAppointments(): void {
    this.appointmentService.getAppointments().subscribe(
      (data: any[]) => {
        this.appointments = data;
        this.appointments.forEach(appointment => {
          this.doctorId = appointment.doctor_id
        });
        this.loading = false;
      },
      (error: any) => {
        console.error('Error fetching appointments:', error);
        this.loading = false;
      }
    );
  }
  
  writePaper(appointmentId: number): void {
    const dialogRef = this.dialog.open(WritePaperDialogComponent, {
      width: '400px',
      data: appointmentId
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchAppointments(); // Refresh after saving
      }
    });
  }
  acceptAppointment(id: number): void {
    this.appointmentService.updateAppointment(id, 'confirmed').subscribe(() => {
      this.fetchAppointments();
    });
  }
  deleteAppointment(id: number): void {
    if (confirm('Are you sure you want to delete this appointment?')) {
      this.appointmentService.deleteAppointment(id).subscribe(() => {
        this.appointments = this.appointments.filter((appt) => appt.id !== id);
      });
    }
  }
}
