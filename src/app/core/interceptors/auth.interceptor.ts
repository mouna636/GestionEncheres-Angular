import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log('AuthInterceptor - intercepting request:', req.url);
    const authReq = req.clone({
      withCredentials: true, // Ensure cookies are sent with the request
    });
    console.log('AuthInterceptor - cloned request:', authReq);
    return next.handle(authReq);
  }
}
