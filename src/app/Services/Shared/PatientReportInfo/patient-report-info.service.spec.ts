import { TestBed } from '@angular/core/testing';

import { PatientReportInfoService } from './patient-report-info.service';

describe('PatientReportInfoService', () => {
  let service: PatientReportInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatientReportInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
