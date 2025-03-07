import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { NavigationService } from '../../Services/Navigation/navigation.service';

@Injectable({
  providedIn: 'root',
})
export class NavigationGuard implements CanActivate {
  constructor(private router: Router, private navigationService: NavigationService) {}

   canActivate(): boolean {
    if (this.navigationService.isDirectAccess()) {
      console.warn('Direct URL access blocked! Redirecting...');
      this.router.navigate(['/']); // Redirect to home
      return false;
    }
    // console.log('Allowed navigation');
    return true;
  }
}
