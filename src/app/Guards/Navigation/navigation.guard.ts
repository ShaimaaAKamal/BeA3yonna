import { Injectable } from '@angular/core';
import { CanActivate, Router, NavigationStart } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class NavigationGuard implements CanActivate {
  private internalNavigation = false;

  constructor(private router: Router) {
    // Detect internal navigation
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.internalNavigation = true;
      }
    });
  }

  canActivate(): boolean {
    if (!this.internalNavigation) {
      this.router.navigate(['/']); // Redirect to home or another safe route
      return false;
    }

    return true;
  }
}

