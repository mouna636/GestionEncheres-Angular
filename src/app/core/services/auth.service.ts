import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { API_URL } from '../configs/config';
import { HttpClient } from '@angular/common/http';
import {
  BehaviorSubject,
  catchError,
  map,
  Observable,
  of,
  tap,
  switchMap,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(user: any): Observable<any> {
    return this.http.post<any>(API_URL + '/auth/login', user, {
      withCredentials: true,
    });
  }

  checkAuthStatus(): Observable<any> {
    console.log('AuthService - checkAuthStatus called');
    return this.http.get<User>(API_URL + '/auth/profile', {
      observe: 'response',
      withCredentials: true,
    });
  }

  register(user: any): Observable<any> {
    return this.http.post<any>(API_URL + '/auth/register', user);
  }

  getCurrentUser(): any {
    let user;
    this.http
      .get<any>(API_URL + '/auth/profile', { withCredentials: true })
      .subscribe((user) => {
        user = user;
      });
    return user;
  }

  getCurrentUserObservable(): Observable<any> {
    return this.http.get<any>(API_URL + '/auth/profile', {
      withCredentials: true,
    });
  }
}
