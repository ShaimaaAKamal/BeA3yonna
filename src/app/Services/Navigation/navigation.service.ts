import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        sessionStorage.setItem('internalNavigation', 'true'); 
      }
    });
  }

  isDirectAccess(): boolean {
    return !sessionStorage.getItem('internalNavigation');
  }
}
