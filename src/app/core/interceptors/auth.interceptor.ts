import { Injectable } from '@angular/core';
import {
  HttpEvent,
<<<<<<< HEAD
  HttpHandler,
  HttpInterceptor,
=======
  HttpInterceptor,
  HttpHandler,
>>>>>>> 7040cb29d832349db0d7336f22872348a1b1bdae
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
<<<<<<< HEAD
    // Check if the request is for the login endpoint
    // if (req.url.includes('/signin')) {
    //   return next.handle(req);
    // }

    const clonedRequest = req.clone({
      withCredentials: true, // Include HttpOnly cookies in the request
    });
    return next.handle(clonedRequest);
=======
    console.log('AuthInterceptor - intercepting request:', req.url);
    const authReq = req.clone({
      withCredentials: true, // Ensure cookies are sent with the request
    });
    console.log('AuthInterceptor - cloned request:', authReq);
    return next.handle(authReq);
>>>>>>> 7040cb29d832349db0d7336f22872348a1b1bdae
  }
}
