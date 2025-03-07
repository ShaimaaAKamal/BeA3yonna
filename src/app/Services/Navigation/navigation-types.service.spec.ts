import { TestBed } from '@angular/core/testing';

import { NavigationTypesService } from './navigation-types.service';

describe('NavigationTypesService', () => {
  let service: NavigationTypesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavigationTypesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
