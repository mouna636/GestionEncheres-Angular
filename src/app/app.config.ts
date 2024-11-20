import { WebSocketService } from './core/services/websockets.service';
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
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withViewTransitions()),
    provideHttpClient(withFetch()),
    provideClientHydration(),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    WebSocketService,
    provideAnimations(), // required animations providers
    provideToastr(), // Toastr providers
    // { provide: 'authGuard', useValue: AuthGuard },
  ],
};
