import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { Booking } from '../interfaces/booking';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUserDetails(userId: string): Observable<User> {
    return this.http.get<User>(`http://localhost:4115/user/${userId}`);
  }

  getUserIdFromToken(): string | null {

    const userData = localStorage.getItem('userData');
    if (userData) {
      const parsedData = JSON.parse(userData);
      const token = parsedData.token;
      console.log("From service:", token);
      if (token) {
        const decodedToken: any = jwtDecode(token);
        return decodedToken.userId || null;        
      }
    }
    return null;
  }
  bookTour(bookingData: Booking): Observable<any> {
    return this.http.post<any>('http://localhost:4115/booking/create-booking', bookingData);
  }
}