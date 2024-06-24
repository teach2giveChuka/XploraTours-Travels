import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent {
  showNotification = false;
  type: string | undefined;
  message: string | undefined;

  show(message: string, type: string) {
    this.message = message;
    this.type = type;
    this.showNotification = true;

    setTimeout(() => {
      this.showNotification = false;
    }, 3000); // Hide after 3 seconds
  }
}
