import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NavigationTypeService {
  getNavigationType(): string {
    if ('performance' in window) {
      const navigationEntries = performance.getEntriesByType('navigation');
      if (navigationEntries.length > 0) {
        const navigationType:any = (navigationEntries[0] as PerformanceNavigationTiming).type;
        switch (navigationType) {
          case 'navigate':
            return 'direct-access';
          case 'reload':
            return 'refresh';
          case 'back_forward':
            return 'back-forward';
          default:
            return 'unknown';
        }
      }
    }
    return 'unsupported';
  }
}
