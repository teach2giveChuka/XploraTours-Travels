import { Injectable } from '@angular/core';
import { Login } from '../interfaces/login';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private checkTokenUrl = 'http://localhost:4115/auth/check-details'; 

  constructor(private http: HttpClient) { }

  verifyToken(token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'token': token
    });

    return this.http.get<any>(this.checkTokenUrl, { headers }).pipe(
      catchError(error => {
        return throwError(error); // Handle error at the component level
      })
    );
  }

  loginUser(login: Login): Observable<any> {
    return this.http.post('http://localhost:4115/auth/login', login);
  }
}
