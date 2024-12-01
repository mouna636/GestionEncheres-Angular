import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { API_URL } from '../configs/config';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
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
  }
}
