import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = ' https://localhost:7025/api';

  constructor(private http: HttpClient) {}

  Autenticar(formDTO: any): Observable<any> {

    const url = `${this.apiUrl}/Users/Criar`;
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=UTF-8'}) };
    return this.http.post(url, formDTO,httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Erro no cliente
      console.error('Erro ocorreu:', error.error.message);
    } else {
      // Erro no servidor
      console.error(`Código do erro: ${error.status}, ` +
                    `Erro: ${error.error}`);
    }
    // Retorne um observable com uma mensagem de erro
    return throwError('Ocorreu um erro. Cadastro existe no sistema');
  }
}
