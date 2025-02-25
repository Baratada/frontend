import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppointmentService } from '../../services/appointmentService/appointment.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-write-paper-dialog',
  templateUrl: './write-paper-dialog.component.html',
  styleUrls: ['./write-paper-dialog.component.scss'],
  imports: [FormsModule],
})
export class WritePaperDialogComponent {
  paperContent: string = '';

  constructor(
    public dialogRef: MatDialogRef<WritePaperDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public appointmentId: number,
    private appointmentService: AppointmentService
  ) {}

  savePaper(): void {
    if (!this.paperContent.trim()) {
      alert("Paper content cannot be empty.");
      return;
    }

    this.appointmentService.writePaper(this.appointmentId, this.paperContent).subscribe(() => {
      this.dialogRef.close(true); // Close dialog and notify success
    }, error => {
      console.error("Error saving paper:", error);
    });
  }

  close(): void {
    this.dialogRef.close();
  }
}
