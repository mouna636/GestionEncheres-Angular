import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { map, switchMap, of } from 'rxjs';

export const AuthGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isAuthenticated()) {
    console.log(authService.isAuthenticated());

    router.navigate(['/signin']);
    return false;
  }
  return true;
};
