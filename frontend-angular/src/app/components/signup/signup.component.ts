import { Component, ViewChild } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { SignupService } from '../../services/signup.service';
import { Signup } from '../../interfaces/user';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { NotificationComponent } from '../notification/notification.component';
import { SignUpResponse } from '../../interfaces/responses';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [NavbarComponent, CommonModule, FormsModule, NotificationComponent],
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
        res => {
          this.notification.show('User signed up successfully!', 'success');
          console.log('User signed up successfully!', res);
        },
        err => {
          this.notification.show('Error signing up user', 'error');
          console.log('Error signing up user:', err);
        }
      );
    }
  }

}
