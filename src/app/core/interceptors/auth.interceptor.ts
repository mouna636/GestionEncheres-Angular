import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Check if the request is for the login endpoint
    // if (req.url.includes('/signin')) {
    //   return next.handle(req);
    // }

    const clonedRequest = req.clone({
      withCredentials: true, // Include HttpOnly cookies in the request
    });
    return next.handle(clonedRequest);
  }
}
