import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgModel } from '@angular/forms';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})


export class NavbarComponent {
  @ViewChild('barIcon') barIcon!: ElementRef<HTMLSpanElement>;
  @ViewChild('closeIcon') closeIcon!: ElementRef<HTMLSpanElement>;
  menuActive: boolean = false;
  isMobileViewport: boolean = false;

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    // Check initial viewport size
    this.checkViewport();
    // Listen for window resize to update viewport size
    window.addEventListener('resize', () => this.checkViewport());
  }

  checkViewport(): void {
    // Determine if viewport is mobile based on width
    this.isMobileViewport = window.innerWidth <= 767;
    // Ensure menu is closed on resize if in desktop view
    if (!this.isMobileViewport) {
      this.menuActive = false;
      this.updateMenuState();
    }
  }

  toggleMenu(): void {
    this.menuActive = !this.menuActive;
    this.updateMenuState();
  }

  updateMenuState(): void {
    // Update visibility of barIcon and closeIcon based on menuActive and isMobileViewport
    if (this.isMobileViewport) {
      this.barIcon.nativeElement.classList.toggle('active', this.menuActive);
      this.closeIcon.nativeElement.classList.toggle('active', this.menuActive);
    } else {
      this.barIcon.nativeElement.classList.remove('active');
      this.closeIcon.nativeElement.classList.remove('active');
    }
    // Prevent scrolling of body when menu is open
    if (this.menuActive) {
      this.elementRef.nativeElement.ownerDocument.body.style.overflow = 'hidden';
    } else {
      this.elementRef.nativeElement.ownerDocument.body.style.overflow = '';
    }
  }
}