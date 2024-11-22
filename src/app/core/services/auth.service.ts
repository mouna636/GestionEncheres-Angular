import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { API_URL } from '../configs/config';
import { HttpClient } from '@angular/common/http';
<<<<<<< HEAD
import { BehaviorSubject, catchError, Observable, of, tap } from 'rxjs';
=======
import {
  BehaviorSubject,
  catchError,
  map,
  Observable,
  of,
  tap,
  switchMap,
} from 'rxjs';
>>>>>>> 7040cb29d832349db0d7336f22872348a1b1bdae

@Injectable({
  providedIn: 'root',
})
export class AuthService {
<<<<<<< HEAD
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    this.checkAuthStatus();
  }

  login(user: any): Observable<any> {
    return this.http
      .post<any>(API_URL + '/auth/login', user, {
        withCredentials: true,
      })
      .pipe(
        tap((response) => {
          this.currentUserSubject.next(response);
        })
      );
  }

  logout(): Observable<any> {
    return this.http
      .post(
        '/auth/logout',
        {},
        {
          withCredentials: true,
        }
      )
      .pipe(
        tap(() => {
          this.currentUserSubject.next(null);
        })
      );
  }

  checkAuthStatus(): void {
    this.http
      .get<User>(API_URL + '/auth/profile', {
        withCredentials: true,
      })
      .subscribe(
        (user) => {
          this.currentUserSubject.next(user);
        },
        (error) => {
          this.currentUserSubject.next(null);
        }
      );
  }

  isAuthenticated(): boolean {
    return !!this.currentUserSubject.value;
=======
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
>>>>>>> 7040cb29d832349db0d7336f22872348a1b1bdae
  }
}
