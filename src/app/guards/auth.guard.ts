import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/authService/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService); // Inject AuthService
  const router = inject(Router); // Inject Router

  if (authService.isLoggedIn()) {
    return true; // Allow access if logged in
  } else {
    router.navigate(['/login']); // Redirect to login if not authenticated
    return false;
  }
};