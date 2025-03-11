import { TestBed } from '@angular/core/testing';

import { TranslationCacheService } from './translation-cache.service';

describe('TranslationCacheService', () => {
  let service: TranslationCacheService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TranslationCacheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
