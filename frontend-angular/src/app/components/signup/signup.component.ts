import { Component, ViewChild } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { SignupService } from '../../services/signup.service';
import { Signup } from '../../interfaces/user';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { NotificationComponent } from '../notification/notification.component';
import { SignUpResponse } from '../../interfaces/responses';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [NavbarComponent, CommonModule, FormsModule, NotificationComponent, RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  @ViewChild(NotificationComponent) notification: NotificationComponent = new NotificationComponent();

  signup: Signup = {
    firstname: '',
    lastname: '',
    email: '',
    password: ''
  }

  constructor(private signupService: SignupService) { }

  submitForm(form: NgForm) {
    if (form.valid) {
      this.signupService.signupUser(this.signup).subscribe(
        (res:any) => {
          const response = res as SignUpResponse;
          if (response.responseCode === 200) {
            this.notification.show('Registration was completed successfuly :) go to login', 'success');
            console.log('User registered in successfully!', response);
          } else {
            console.log('Registration failed :( ', response.message);
            this.notification.show(response.message, 'error');
          }
        },
      
        err => {
          this.notification.show('Error during Registration', 'error');
          console.log('Error signing up user:', err);
        }
      );
    }
  }

}
