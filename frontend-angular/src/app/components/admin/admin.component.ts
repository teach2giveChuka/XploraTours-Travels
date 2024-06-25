import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { Tour } from '../../interfaces/tour';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Booking } from '../../interfaces/booking';
import { User } from '../../interfaces/user';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';



@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  users: User[] = []
  totalEarned:number = 0
  count = 0
  activeToursCount = 0
  bookingsCount = 0
  bookings: any[] = [];
  controlsVisible: { [key: number]: boolean } = {};
  ammount: number = 0;
  tours: Tour[] = [];
  tourForm: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';
  showForm: boolean = false; // Declare showForm property
  isUpdateMode: boolean = false; 
  editingTour: Tour | null = null;


  constructor(private adminService: AdminService, private fb: FormBuilder, private router: Router, private authService : AuthService) {
    this.tourForm = this.fb.group({
      id: [''],
      destination: [''],
      duration: [0],
      price: [0],
      tourType: [''],
      isActive: true,
      createdAt: [new Date().toISOString()], // Set to ISO format
      startDate: [new Date().toISOString()], // Set to ISO format
      endDate: [new Date().toISOString()],
      description: [''],
      destinationImage1: [''],
      destinationImage2: [''],
      destinationImage3: [''],
      destinationImage4: ['']
    });
  }


  //onload
  ngOnInit(): void {
    this.checkToken();
    this.fetchAllTours();
    this.totalEarnedCollectively();
    this. getAllBookings();
    this.usersCount();
    this.viewAllActiveTours();
    this.fetchAllUsers()
    
  }


  fetchAllTours(): void {
    this.adminService.viewAllTours().subscribe(tours => {
      this.tours = tours;
      console.log(this.tours);
      this.tours.forEach((_, index) => {
        this.controlsVisible[index] = false;
      });
    });
  }

  createNewTour(tourData: Tour): void {
    console.log('Received tour data:', tourData); // Debugging: Log received data
  
    // Ensure tourData is not null or undefined
    if (!tourData) {
      console.error('Tour data is null or undefined.');
      return;
    }
  
    this.adminService.createTour(tourData).subscribe(createdTour => {
      this.tours.push(createdTour);
      console.log('Created tour:', createdTour); // Debugging: Log created tour
      console.log('Current form data:', this.tourForm.value); // Debugging: Log current form data
      this.showSuccessMessage("Tour Created successfully!");
      this.tourForm.reset();
    }, error => {
      console.error('Error creating tour:', error); // Debugging: Log any error
    });
  }

  deleteTour(id: string): void {
    this.adminService.deleteTour(id).subscribe(() => {
      this.tours = this.tours.filter(tour => tour.id !== id);
      this.showSuccessMessage("Tour deleted successfuly!");
    });
  }

  updateTour(tour: Tour): void {
    this.adminService.updateTour(tour.id, tour).subscribe(updatedTour => {
      const index = this.tours.findIndex(t => t.id === updatedTour.id);
      this.showSuccessMessage("Tour updated succesfuly.");
      if (index !== -1) {
        this.tours[index] = updatedTour;
        
      }
    });
  }

  clickSubmit(){
    console.log("Cicked submit");
  }

  activateTour(id: string): void {
    this.adminService.activateTour(id).subscribe(() => {
      const index = this.tours.findIndex(tour => tour.id === id);
      if (index !== -1) {
        this.tours[index].isActive = true; 
        console.log('Activated');
        this.showSuccessMessage("Status activated succesfully");
      }
    });
  }

  deactivateTour(id: string): void {
    this.adminService.deactivateTour(id).subscribe(() => {
      const index = this.tours.findIndex(tour => tour.id === id);
      if (index !== -1) {
        this.tours[index].isActive = false; 
        this.showSuccessMessage("Deactivated Susscefuly.");
        console.log('Deactivate');
      }
    });
  }


  viewTourById(id: string): void {
    console.log("Selected tour ID is:", id);

    this.adminService.viewTourById(id).subscribe(tour => {
      console.log("Tour data:", tour);
    });
  }

  viewTourByDestination(destination: string): void {
    this.adminService.viewTourByDestination(destination).subscribe(tour => {
      console.log("Destination is:", tour);
    });
  }

  viewAllActiveTours(): void {
    this.adminService.viewAllActiveTours().subscribe(tours => {
      console.log("Active tours are:", tours);
      this.activeToursCount = tours.length
    });
  }

  viewAllInactiveTours(): void {
    this.adminService.viewAllInactiveTours().subscribe(tours => {
      console.log("Inactive tours are:", tours);
    });
  }

  //bookings for one user
  getBooking(id: string): void {
    this.adminService.getBooking(id).subscribe(bookings => {
      console.log("Bookings for one user are:", bookings);
    });
  }

  //get all bookings
  getAllBookings(): void {
    this.adminService.getAllBookings().subscribe(bookings => {
      console.log("All bookings are:", bookings);
      this.bookings = bookings
      this.bookingsCount = bookings.length
    });
  }

  //view tour booking
  viewTourBooking(id: string): void {
    this.adminService.viewTourBooking(id).subscribe(bookings => {
      console.log("Tour bookings are:", bookings);
    });
  }

  //view count of bookings for a tour
  viewCountOfBookingsForTour(id: string): void {
    this.adminService.viewBookingCount(id).subscribe(count => {
      console.log("Count of bookings for a tour is:", count);
    });
  }

  //total earned from a tour
  totalEarnedFromTour(id: string): void {
    this.adminService.totalEarned(id).subscribe(earned => {
      console.log("Total earned from a tour is:", earned);
    });
  }

 // Updated totalEarnedCollectively method
 totalEarnedCollectively(): void {
  this.adminService.totalEarnedAll().subscribe(earned => {
    console.log("Total earned collectively is:", earned.totalAmount);
    this.totalEarned = earned.totalAmount; 
    console.log("Total earned collectively is:", this.totalEarned);
  });
}


usersCount(): void {
  this.adminService.usersCount().subscribe(count => {
    console.log("Total number of users is:", count);
    this.count = count;
  });
}

//all users here!!!!!!!!!!!!!!!!!!!!
fetchAllUsers(): void {
  this.adminService.fetchAllUsers().subscribe(users => {
    this.users = users;
    console.log("All users", users)
  }, error => {
    console.error('Error fetching users:', error);
  });
}

fetchUserById(userId: string): void {
  this.adminService.fetchUserById(userId).subscribe(user => {
    console.log("Fetched user:", user);   
    console.error('Error fetching user by i:');
  });
}

//softedelete
softDelete(userId: string): void {
  console.log(userId)
    this.adminService.softDeleteUser(userId).subscribe({
      next: (response) => {
        this.showSuccessMessage("User softdeleted Succesfuly.");
        console.log('User soft deleted successfully', response);
        this.fetchAllUsers();
      },
      error: (error) => {
        console.error('Error soft deleting user:', error);
      }
    });
}
//restore user
restoreUser(userId: string) {
  this.adminService.restoreUser(userId).subscribe({
    next: (response) => console.log('User restored successfully', response),
    error: (error) => console.error('Error restoring user', error)

  });
  this.showSuccessMessage("Status activated succesfully");
}

showSuccessMessage(message: string): void {
  this.successMessage = message;
  setTimeout(() => this.successMessage = '', 3000); 
}

// Method to show error message
showErrorMessage(message: string): void {
  this.errorMessage = message;
  setTimeout(() => this.errorMessage = '', 3000); 
}

onSubmit(): void {
  if (this.isUpdateMode) {

  } else {
  }
}


  openCreateForm(): void {
    this.showForm = true;
    this.isUpdateMode = false;
    this.tourForm.reset();
  }

    openUpdateForm(tourData: any): void {
      this.showForm = true;
      this.isUpdateMode = true;
      this.tourForm.patchValue(tourData);
    }

    submitTour(): void {
      const tourData: Tour = this.tourForm.value;
    
      if (this.isUpdateMode && this.editingTour) {
    
        this.adminService.updateTour(this.editingTour.id, tourData).subscribe(updatedTour => {
          
          const index = this.tours.findIndex(t => t.id === updatedTour.id);
          if (index !== -1) {
            this.tours[index] = updatedTour;
          }
          this.resetForm();
        });
      } else {
     
        this.adminService.createTour(tourData).subscribe(createdTour => {
          this.tours.push(createdTour);
          this.resetForm();
        });
      }
    }

    resetForm(): void {
      this.tourForm.reset();
      this.isUpdateMode = false;
      this.editingTour = null;
    }

    
openForEdit(tour: Tour): void {
  this.isUpdateMode = true;
  this.editingTour = tour;
  this.tourForm.patchValue(tour);
}

toggleFormVisibility(): void {
  this.showForm = !this.showForm;
}  

//verify token validity
checkToken(): void {
  const token = localStorage.getItem('userData');
  if (token) {
    this.authService.verifyToken(token).subscribe({
      next: (data) => {
        console.log('Token is valid:', data);
    this.fetchAllTours();   
    this. getAllBookings();   
    this.viewAllActiveTours();
    this.fetchAllUsers()
      },
      error: (error) => {
        console.error('Token is invalid:', error);
        this.router.navigate(['/login']);
      }
    });
  }
  else {
    this.router.navigate(['/login']);
  }
}
}
