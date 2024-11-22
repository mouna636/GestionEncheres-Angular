<<<<<<< HEAD
=======
import { WebSocketService } from './core/services/websockets.service';
>>>>>>> 7040cb29d832349db0d7336f22872348a1b1bdae
import { ApplicationConfig, inject } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { AuthGuard } from './core/guards/auth.guard';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from 'express';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
<<<<<<< HEAD
=======
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
>>>>>>> 7040cb29d832349db0d7336f22872348a1b1bdae

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withViewTransitions()),
<<<<<<< HEAD
    provideClientHydration(),
    provideHttpClient(withFetch()),
    // { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: 'authGuard', useValue: AuthGuard },
=======
    provideHttpClient(withFetch()),
    provideClientHydration(),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    WebSocketService,
    provideAnimations(), // required animations providers
    provideToastr(), // Toastr providers
    // { provide: 'authGuard', useValue: AuthGuard },
>>>>>>> 7040cb29d832349db0d7336f22872348a1b1bdae
  ],
};
