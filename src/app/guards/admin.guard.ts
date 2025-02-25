import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/userService/user.service';
import { User } from '../models/user.model';
import { Observable, map, tap } from 'rxjs';

export const adminGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);

  const user$: Observable<User> = userService.getUserById(localStorage.getItem('user_id')!);

  return user$.pipe(
    map(user => {
      if (user.role === 'admin') {
        return true;
      } else {
        router.navigate(['']); // Redirect if not authorized
        return false;
      }
    })
  );
};
