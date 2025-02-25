// src/app/app.routes.ts

import { Routes } from '@angular/router';
import { HomeComponent } from './app/components/home/home.component';
import { DoctorsComponent } from './app/components/doctors/doctors.component';
import { ContactComponent } from './app/components/contact/contact.component';
import { LoginComponent } from './app/components/login/login.component';
import { PatientsComponent } from './app/components/patients/patients.component';
import { AppointmentsComponent } from './app/components/appointments/appointments.component';
import { RegisterComponent } from './app/components/register/register.component';
import { ProfileComponent } from './app/components/profile/profile.component';
import { AdminDashboardComponent } from './app/components/admin-dashboard/admin-dashboard.component';
import { DrugComponent } from './app/components/drug/drug.component';
import { DrugsComponent } from './app/components/drugs/drugs.component';
import { AppointmentComponent } from './app/components/appointment/appointment.component';

import { authGuard } from './app/guards/auth.guard';
import { adminGuard } from './app/guards/admin.guard';
import { doctorGuard } from './app/guards/doctor.guard';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'doctors', component: DoctorsComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'login', component: LoginComponent},
    { path: 'patients', component: PatientsComponent, canActivate: [authGuard] },
    { path: 'appointments', component: AppointmentsComponent, canActivate: [authGuard] },
    { path: 'register', component: RegisterComponent },
    { path: 'profile/:id', component: ProfileComponent, canActivate: [authGuard] },
    { path: 'admin-dashboard', component: AdminDashboardComponent, canActivate: [adminGuard] },
    { path: 'drug/:id', component: DrugComponent },
    { path: 'drugs', component: DrugsComponent },
    { path: 'appointment/:id', component: AppointmentComponent, canActivate: [authGuard] },
    { path: '**', redirectTo: '' }
];
