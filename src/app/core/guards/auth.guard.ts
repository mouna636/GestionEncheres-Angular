import { CanActivateFn, Router } from '@angular/router';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { map, switchMap, of, catchError } from 'rxjs';
import { HttpHeaderResponse } from '@angular/common/http';

export const AuthGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  if (isPlatformBrowser(platformId) && window.location.pathname === '/signin') {
    console.log('AuthGuard - already on signin page');
    return of(true);
  }

  return authService.checkAuthStatus().pipe(
    map((res: HttpHeaderResponse) => {
      console.log('AuthGuard - checkAuthStatus response:', res);
      if (res.status === 401) {
        return false;
      } else {
        return true;
      }
    }),
    switchMap((isAuthenticated: boolean) => {
      console.log('AuthGuard - isAuthenticated:', isAuthenticated);
      if (!isAuthenticated) {
        router.navigate(['/signin']);
      }
      return of(isAuthenticated);
    }),
    catchError((err) => {
      console.log('AuthGuard - error:', err);
      // if (err.status === 401) router.navigate(['/signin']);
      return of(false);
    })
  );
};
