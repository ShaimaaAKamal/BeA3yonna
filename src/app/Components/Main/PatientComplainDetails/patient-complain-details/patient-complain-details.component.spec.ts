import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientComplainDetailsComponent } from './patient-complain-details.component';

describe('PatientComplainDetailsComponent', () => {
  let component: PatientComplainDetailsComponent;
  let fixture: ComponentFixture<PatientComplainDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PatientComplainDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientComplainDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
