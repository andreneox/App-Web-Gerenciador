import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/Products' ;

@Injectable()
export class ProductListService {
  private resourceUrl = 'http://localhost:8000/products';


  constructor(private http: HttpClient) { }

   create(product: Product): Observable<Product>{
    const copy = this.convert(product);
    return this.http.post<Product>(this.resourceUrl, copy);
   }

   update(product: Product): Observable<Product>{
    const copy = this.convert(product);
    return this.http.put<Product>(`${this.resourceUrl}/${copy.id}`, copy);
   }

   find(id: number): Observable<Product> {
      return this.http.get<Product>(`${this.resourceUrl}/${id}`);
   }

   findAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.resourceUrl)
   }

   delete(id: number  |   undefined): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`);
   }
    



   private convert(product: Product): Product {
    const copy: Product = Object.assign({}, product);
    return copy;
   }
}
