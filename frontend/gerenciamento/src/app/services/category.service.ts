import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  url = 'http://localhost:8000/';
  constructor(private httpClient: HttpClient) { }

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  /* ---------- CATEGORIES --------------- */
  // Obtem todos os categorias
  getCategories(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(this.url + 'category')
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  // Obtem um categoria pelo id
  getCategoryById(id: number): Observable<Category> {
    return this.httpClient.get<Category>(this.url + 'category/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // salva um categoria
  saveCategory(category: Category): Observable<Category> {
    return this.httpClient.post<Category>(this.url + 'category', JSON.stringify(category), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // atualiza um categoria
  updateCategory(category: Category): Observable<Category> {
    return this.httpClient.put<Category>(this.url + 'category/' + category.id, JSON.stringify(category), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // deleta um categoria
  deleteCategory(category: Category) {
    return this.httpClient.delete<Category>(this.url + 'category/' + category.id, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
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
