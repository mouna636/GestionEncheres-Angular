import { Injectable } from '@angular/core';
import { Product } from './product';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Categorie } from '../categories/categorie';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:3000/products';  

  constructor(private http: HttpClient) {}

  
  public getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  } 


  addProductWithImage(productData: FormData): Observable<Product> {
    const headers = new HttpHeaders();
    return this.http.post<Product>(this.apiUrl, productData, { headers });
  }
  deleteProd(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
