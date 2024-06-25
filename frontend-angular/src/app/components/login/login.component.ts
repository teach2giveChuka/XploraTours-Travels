import { Component, ViewChild } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { Login } from '../../interfaces/login';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { NotificationComponent } from '../notification/notification.component';
import { LoginResponse } from '../../interfaces/responses';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NavbarComponent, CommonModule, FormsModule, NotificationComponent, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] // Corrected property name and made it an array
})
export class LoginComponent {
  @ViewChild(NotificationComponent) notification!: NotificationComponent; // Corrected usage

  login: Login = {
    email: '',
    password: ''
  };

  constructor(private authService: AuthService, private router: Router) { }

 
  loginUser(form: NgForm) {
    if (form.valid) {
      this.authService.loginUser(this.login).subscribe(
        (res: any) => { // Temporarily bypass type checking !!very important!!!!!!!!!!
          const response = res as LoginResponse;
          if (response.responseCode === 200) {
            this.notification.show('Welcome back :)', 'success');
            console.log('User logged in successfully!', response);
            localStorage.setItem('userData', JSON.stringify(response));
            setTimeout(() => {
              if (response.role === 'user') {
                console.log('Navigating to user dashboard');
                this.router.navigate(['/user']);
              } else if (response.role === 'admin') {
                console.log('Navigating to admin dashboard');
                this.router.navigate(['/admin']);
              }
            }, 2000);
          } else {
            console.log('Login failed:', response.message);
            this.notification.show(response.message, 'error');
          }
        },
        err => {
          console.log('Error logging in user:', err);
          this.notification.show('Error Logging in, Confirm credentials and try again', 'error');
        }
      );
    }
  }
}