import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { Signup } from '../../interfaces/user';
import { SignupService } from '../../services/signup.service';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NavbarComponent, CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})


export class LoginComponent {
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
          console.log('User signed up successfully!', res);
        },
        err => {
          console.log('Error signing up user:', err);
        }
      );
    }
  }
}
