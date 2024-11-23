import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '../configs/config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EnchereService {
  constructor(private http: HttpClient) {}

  getEncheres(): Observable<any> {
    return this.http.get(`${API_URL}/encheres`, {
      withCredentials: true,
    });
  }

  createEnchere(enchere: any): Observable<any> {
    return this.http.post(`${API_URL}/encheres`, enchere, {
      withCredentials: true,
    });
  }

  getEnchere(id: string): Observable<any> {
    return this.http.get(`${API_URL}/encheres/${id}`, {
      withCredentials: true,
    });
  }
}
