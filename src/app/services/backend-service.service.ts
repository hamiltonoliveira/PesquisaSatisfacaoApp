import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = ' https://localhost:7025/api';
  token: any;
  usuarioId: any;

  constructor(private http: HttpClient) {
  }

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

  EnqueteCadastrar(formDTO2: any): Observable<any> {
    const url = `${this.apiUrl}/Enquete/Criar`;
    const token = this.getJWTToken();

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=UTF-8',
        'Authorization': `Bearer ${token}`
      })
    };

    return this.http.post(url, formDTO2,httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  getJWTToken(): string | null {
    const dataString = localStorage.getItem('jwtToken');
    if (dataString !== null) {
      const data = JSON.parse(dataString);
      if (data && typeof data.token === 'string') {
        return data.token;
      }
    }
    return null;
  }
}


