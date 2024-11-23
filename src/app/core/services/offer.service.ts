import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '../configs/config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OfferService {
  constructor(private http: HttpClient) {}


    getOffers(): Observable<any> {
        return this.http.get(`${API_URL}/offers`, {
        withCredentials: true,
        });
    }

    createOffer(offer: any): Observable<any> {
        return this.http.post(`${API_URL}/offers`, offer, {
        withCredentials: true,
        });
    }

    getOfferById(id: string): Observable<any> {
        return this.http.get(`${API_URL}/offers/${id}`, {
        withCredentials: true,
        });
    }

    

  
}
