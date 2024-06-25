import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Tour } from '../../interfaces/tour';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tour-popup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tour-popup.component.html',
  styleUrl: './tour-popup.component.css'
})
export class TourPopupComponent {
  @Input() tour: any;
  @Output() closePopup = new EventEmitter<void>();

  close() {
    this.closePopup.emit();
  }
}