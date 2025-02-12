// src/app/app.routes.ts

import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DoctorsComponent } from './components/doctors/doctors.component';
import { ContactComponent } from './components/contact/contact.component';
import { LoginComponent } from './components/login/login.component';
import { PatientsComponent } from './components/patients/patients.component';
import { AppointmentsComponent } from './components/appointments/appointments.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'doctors', component: DoctorsComponent},
    { path: 'contact', component: ContactComponent },
    { path: 'login', component: LoginComponent},
    { path: 'patients', component: PatientsComponent },
    { path: 'appointments', component: AppointmentsComponent},
    { path: 'register', component: RegisterComponent },
    { path: 'profile/:id', component: ProfileComponent },
];
