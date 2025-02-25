import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppointmentService } from '../../services/appointmentService/appointment.service';
import { MatDialog } from '@angular/material/dialog';
import { WritePaperDialogComponent } from '../write-paper-dialog/write-paper-dialog.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss'],
  imports: [FormsModule, CommonModule]
})
export class AppointmentComponent implements OnInit {
  appointment: any = {};
  loading: boolean = true;
  appointmentId: number = 0;

  constructor(
    private route: ActivatedRoute,
    private appointmentService: AppointmentService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.appointmentId = Number(this.route.snapshot.paramMap.get('id')) || 0;
    this.fetchAppointmentDetails();
  }

  fetchAppointmentDetails(): void {
    this.appointmentService.getAppointmentById(this.appointmentId).subscribe(
      (data: any) => {
        console.log('Fetched appointment data:', data); // Log the fetched data
        this.appointment = data;
        this.loading = false;
      },
      (error: any) => {
        console.error('Error fetching appointment details:', error);
        this.loading = false;
      }
    );
  }
  

  writePaper(): void {
    const dialogRef = this.dialog.open(WritePaperDialogComponent, {
      width: '400px',
      data: this.appointmentId
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchAppointmentDetails(); // Refresh after saving
      }
    });
  }
}
