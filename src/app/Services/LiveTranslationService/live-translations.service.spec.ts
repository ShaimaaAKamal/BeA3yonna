import { TestBed } from '@angular/core/testing';

import { LiveTranslationsService } from './live-translations.service';

describe('LiveTranslationsService', () => {
  let service: LiveTranslationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LiveTranslationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
