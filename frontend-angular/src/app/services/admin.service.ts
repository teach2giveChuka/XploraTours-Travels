import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Tour } from '../interfaces/tour';
import { Booking } from '../interfaces/booking';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  
  createTour(tour: Tour): Observable<Tour> {
    return this.http.post<Tour>('http://localhost:4115/tour/create-tour', tour);
  }


  //view all tours
  viewAllTours(): Observable<Tour[]> {
    return this.http.get<Tour[]>('http://localhost:4115/tour/view-all-tours').pipe(
      map(response => response)
    );
  }

  //delete tour
  deleteTour(id: string): Observable<Tour> {
    return this.http.delete<Tour>(`http://localhost:4115/tour/delete-tour/${id}`);

  }

  //users
    fetchAllUsers(): Observable<User[]> {
    return this.http.get<User[]>('http://localhost:4115/user/all');
  }


  //update tour
  updateTour(id: string, tour: Tour): Observable<Tour> {
    return this.http.put<Tour>(`http://localhost:4115/tour/update-tour/${id}`, tour);
  }

  //view tour by id
  viewTourById(id: string): Observable<Tour> {
    return this.http.get<Tour>(`http://localhost:4115/tour/view-tour/${id}`);
  }

  //view tour by destination
  viewTourByDestination(destination: string): Observable<Tour> {
    return this.http.get<Tour>(`http://localhost:4115/tour/view-tour-by-destination/${destination}`);
  }

  //activatw tour
  activateTour(id: string): Observable<Tour> {
    return this.http.put<Tour>(`http://localhost:4115/tour/activate-tour/${id}`, null);
  }

  //deactivate tour
  deactivateTour(id: string): Observable<Tour> {
    return this.http.put<Tour>(`http://localhost:4115/tour/deactivate-tour/${id}`, null);
  }

  //view all active tours
  viewAllActiveTours(): Observable<Tour[]> {
    return this.http.get<Tour[]>('http://localhost:4115/tour/view_active_tours');
  }

  //view all inactive tours
  viewAllInactiveTours(): Observable<Tour[]> {
    return this.http.get<Tour[]>('http://localhost:4115/tour/view-all-inactive-tours');
  }

//get bookings for one user

getBooking(id: string): Observable<Booking[]> {
  return this.http.get<Booking[]>(`http://localhost:4115/booking/view-user-booking/${id}`);
}

//get all bookings
getAllBookings(): Observable<Booking[]> {
  return this.http.get<Booking[]>(`http://localhost:4115/booking/view-all-bookings`);
}


//view tour booking
viewTourBooking(id: string): Observable<Booking[]> {
  return this.http.get<Booking[]>(`http://localhost:4115/booking/view-tour-booking/${id}`);
}

//view count of bookings for a tour
viewBookingCount(id: string): Observable<number> {
  return this.http.get<number>(`http://localhost:4115/booking/bookingsCount/${id}`);
}

//total earned from a tour
totalEarned(id: string): Observable<number> {
  return this.http.get<number>(`http://localhost:4115/booking/totalAmmountPerTour/${id}`);
}

//total earned from all tours
totalEarnedAll(): Observable<{ totalAmount: number }> {
  return this.http.get<{ totalAmount: number }>('http://localhost:4115/booking/totalAmountCollectively');
}

//users count
usersCount(): Observable<number> {
  return this.http.get<number>('http://localhost:4115/user/count');
}

//user by id
fetchUserById(id: string): Observable<User> {
  return this.http.get<User>(`http://localhost:4115/user/${id}`);
}

//soft delete user

softDeleteUser(id: string): Observable<any> {
  return this.http.put(`http://localhost:4115/user/softdelete/${id}`, {});
}

//restore
restoreUser(userId: string): Observable<any> {
  return this.http.put(`http://localhost:4115/user/restore/${userId}`, {});
}












}

