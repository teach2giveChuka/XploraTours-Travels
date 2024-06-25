
import { Component, AfterViewInit, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LoginComponent } from '../login/login.component';
import { SignupComponent } from '../signup/signup.component';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [NavbarComponent, LoginComponent, SignupComponent, RouterLink],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})

export class LandingComponent  {

  constructor() {}

 
}