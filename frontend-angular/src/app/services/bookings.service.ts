import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// import {  } from '../interfaces/booking';
import { UserBookings } from '../interfaces/userBookings';
import { jwtDecode } from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class BookingsService {

  constructor(private http: HttpClient) { }

  /**
   * ###getBooking for one user(pass user id in the url as id)
GET http://localhost:4115/booking/view-user-booking/1fd73e47-380b-4d5e-a3c7-4d84a422f30c
   */

  getBookings(userId: string): Observable<UserBookings> {
    return this.http.get<UserBookings>(`http://localhost:4115/booking/view-user-booking/${userId}`);
  }
  getUserIdFromToken(): string | null {
    const userData = localStorage.getItem('userData');
    if (userData) {
      const parsedData = JSON.parse(userData);
      const token = parsedData.token;
      if (token) {
        const decodedToken: any = jwtDecode(token);
        return decodedToken.userId || null;
      }
    }
    return null;
  }
}
