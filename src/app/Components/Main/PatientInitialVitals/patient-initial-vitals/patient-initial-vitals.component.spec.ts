import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientInitialVitalsComponent } from './patient-initial-vitals.component';

describe('PatientInitialVitalsComponent', () => {
  let component: PatientInitialVitalsComponent;
  let fixture: ComponentFixture<PatientInitialVitalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PatientInitialVitalsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientInitialVitalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
