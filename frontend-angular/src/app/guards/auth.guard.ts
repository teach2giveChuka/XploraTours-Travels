import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    // Retrieve token from localStorage
    const userData = localStorage.getItem('userData');
    const token = userData ? JSON.parse(userData).token : null;

    if (!token) {
      console.warn('No token found in localStorage, redirecting to login page.');
      this.router.navigate(['/login']);
      return false;
    }

    // Verify token validity
    return this.authService.verifyToken(token).pipe(
      map(() => true), // Return true if verification succeeds
      catchError(() => {
        console.error('Error verifying token, redirecting to login.');
        this.router.navigate(['/login']);
        return of(false);
      })
    );
  }
}
