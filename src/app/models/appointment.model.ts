export interface Appointment {
    id?: number;
    patient_id: number;
    doctor_id: number;
    appointment_date: string;
    info?: string;
    status?: string;
    created_at?: string;
    updated_at?: string;
  }
  