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
import { DrugComponent } from './app/drug/drug.component';

import { authGuard } from './app/guards/auth.guard';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'doctors', component: DoctorsComponent},
    { path: 'contact', component: ContactComponent },
    { path: 'login', component: LoginComponent},
    { path: 'patients', component: PatientsComponent, canActivate: [authGuard] },
    { path: 'appointments', component: AppointmentsComponent, canActivate: [authGuard] },
    { path: 'register', component: RegisterComponent },
    { path: 'profile/:id', component: ProfileComponent },
    { path: 'admin-dashboard', component: AdminDashboardComponent },
    { path: 'drug/:id', component: DrugComponent },
    { path: '**', redirectTo: '' }
];
