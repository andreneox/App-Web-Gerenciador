import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductFormService {
  url = 'http://localhost:8000/';
  constructor(private httpClient: HttpClient) { }

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }


  /* ---------- PRODUCTS --------------- */
  // Obtem todos os produtos
  getProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.url + 'product')
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  // Obtem um produto pelo id
  getProductById(id: number): Observable<Product> {
    return this.httpClient.get<Product>(this.url + 'product/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // salva um produto
  saveProduct(product: Product): Observable<Product> {
    return this.httpClient.post<Product>(this.url + 'product', JSON.stringify(product), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // atualiza um produto
  updateProduct(product: Product): Observable<Product> {
    return this.httpClient.put<Product>(this.url + 'product/' + product.id, JSON.stringify(product), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // deleta um produto
  deleteProduct(product: Product) {
    return this.httpClient.delete<Product>(this.url + 'product/' + product.id, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  /* ---------- CATEGORIES --------------- */
  // Obtem todos os produtos
  getCategories(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.url + 'product')
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  // Manipulação de erros
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `mensagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };

}
