import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categorie } from './categorie';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private apiUrl = 'http://localhost:3000/categories'; 

  constructor(private http: HttpClient) {}

  addCategory(category: Categorie): Observable<Categorie> {
    return this.http.post<Categorie>(this.apiUrl, category);
  }

  getCategories(): Observable<Categorie[]> {
    return this.http.get<Categorie[]>(this.apiUrl);
  }

  deleteCat(categoryId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${categoryId}`);
  }
}
