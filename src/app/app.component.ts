import { Component, ChangeDetectorRef } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';  // Import CUSTOM_ELEMENTS_SCHEMA
import { NgModule } from '@angular/core';
import { AuthService } from './services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [HttpClientModule, RouterModule, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]  // Add CUSTOM_ELEMENTS_SCHEMA here
})
export class AppComponent  {
  title = 'Hospital Management System';
  loginState: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.loginState$.subscribe((state: boolean) => {
      this.loginState = state;
    });
  }
}