import { Component, OnInit} from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { Tour } from '../../interfaces/tour';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { User } from '../../interfaces/user';
import { TourPopupComponent } from '../tour-popup/tour-popup.component';
import { UserService } from '../../services/user.service';
import { jwtDecode } from 'jwt-decode';
import { AuthService } from '../../services/auth.service';
import { Booking } from '../../interfaces/booking';
import { NotificationComponent } from '../notification/notification.component';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, TourPopupComponent, RouterLink, NotificationComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {
  successMessage: string = '';
  errorMessage: string = '';
  showForm: boolean = false;
  isUpdateMode: boolean = false; 
  tours: Tour[] = [];
  selectedTour: Tour | null = null;
  userDetails: User | null = null;
  numberOfPeople: number = 1;
  bookingSuccess: boolean = false;
  showBookingForm: boolean = false;
  selectedTourForBooking: Tour | null = null;
  lookFor: string = '';
  filteredTours: Tour[] = [];
  initialLoad: boolean = true;
 

  constructor(private adminService: AdminService, private router: Router, private userService: UserService, private authService: AuthService) {}

  ngOnInit(): void {
    this.loadTours();
    this.checkToken();
    this.filteredTours = this.tours;
  }

  loadTours(): void {
    this.adminService.viewAllTours().subscribe({
      next: (data) => {
        this.tours = data;
        console.log('Tours loaded successfully!', data);
      },
      error: (error) => {
        console.error('There was an error!', error);
      }
    });
  }

  prnt(tour: any) { 
    console.log(tour);
  }

  showTourDetails(tour: Tour) {
    this.selectedTour = tour;
  }

  closeTourDetails() {
    this.selectedTour = null;
    this.showBookingForm = false;
    this.bookingSuccess = false; 
  }

  
  // loadUserDetails(): void {
  //   console.log('Loading user details...');
  //   const userId = this.getUserIdFromLocalStorage();
  //   console.log('User ID:', userId);
  //   console.log(userId)

  //   if (userId) {
  //     this.userService.getUserDetails(userId).subscribe({
  //       next: (data) => {
  //         this.userDetails = data;
  //         console.log('User details loaded successfully!', data);
  //       },
  //       error: (error) => {
  //         console.error('There was an error loading user details!', error);
  //       }
  //     });
  //   }
  // }

  
  loadUserDetails(): void {
    console.log('Loading user details...');
    const userId = this.getUserIdFromToken();
    if (userId) {
      this.userService.getUserDetails(userId).subscribe({
        next: (data: User) => {
          this.userDetails = data;
          console.log('User details loaded successfully!', data);
          console.log("firstname", this.userDetails.firstname) 
        },
        error: (error) => {
          console.error('There was an error loading user details!', error);
        }
      });
    }
  }

  getUserIdFromToken(): string | null {
    const userData = localStorage.getItem('userData');
    if (userData) {
      const parsedData = JSON.parse(userData);
      const token = parsedData.token;
      // console.log('Token:', token);
      if (token) {
        try {
          const decodedToken: any = jwtDecode(token); // Ensure jwt_decode is imported correctly
          return decodedToken.userId || null;
        } catch (error) {
          console.error('Error decoding JWT token:', error);
          return null;
        }
      }
    }
    return null;
  }


  checkToken(): void {
    const userData = localStorage.getItem('userData');
    if (userData) {
      const parsedData = JSON.parse(userData);
      const token = parsedData.token;
      if (token) {
        this.authService.verifyToken(token).subscribe({
          next: (data) => {
            console.log('Token is valid:', data);
            this.loadUserDetails();
          },
          error: (error) => {
            console.error('Token is invalid:', error);
            this.router.navigate(['/login']);
          }
        });
      }
    } else {
      this.router.navigate(['/login']);
    }
  }

  bookTour(): void {
    console.log('Booking tour:', this.selectedTour);
    const userId = this.getUserIdFromToken();
    if (userId && this.selectedTourForBooking) {
      const bookingData = {
        tourId: this.selectedTourForBooking.id,
        userId: userId,
        numberOfPeople: this.numberOfPeople
      };
  
      this.userService.bookTour(bookingData).subscribe({
        next: (response) => {
          console.log('Booking successful:', response);
          this.bookingSuccess = true;
          this.successMessage = 'Booking successful!';
          this.showSuccessMessage("Booking reservation succesful :).");
          this.showBookingForm = false;
        },
        error: (error) => {
          console.error('Error booking tour:', error);
          this.errorMessage = 'Failed to book tour. Please try again later.';
        }
      });
    }
  }
  

  triggerBookingForm(tour: Tour): void {
    console.log('Triggering booking form for tour:', tour);
    this.selectedTourForBooking = tour; 
    this.showBookingForm = true;
    this.bookingSuccess = false;
  }

  calculateTotalPrice(): number {
    if (this.selectedTourForBooking) {
      return this.numberOfPeople * this.selectedTourForBooking.price;
    }
    return 0;
  }

  showSuccessMessage(message: string): void {
    this.successMessage = message;
    setTimeout(() => this.successMessage = '', 3000); 
  }
  
 
  showErrorMessage(message: string): void {
    this.errorMessage = message;
    setTimeout(() => this.errorMessage = '', 3000); 
  }

  search(): void {
    if (this.lookFor.trim() !== '') {
      this.filteredTours = this.tours.filter(tour =>
        tour.tourType.toLowerCase().includes(this.lookFor.trim().toLowerCase())
      );
    } else {
      this.filteredTours = this.tours; // If search term is empty, show all tours
    }
  }
  filterToursByType(): void {
    if (this.lookFor.trim() === '') {
      this.filteredTours = [...this.tours]; // Reset to all tours if search input is empty
    } else {
      this.filteredTours = this.tours.filter(tour => tour.tourType.toLowerCase().includes(this.lookFor.toLowerCase()));
    }
  }

}