import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalPatientInfoComponent } from './additional-patient-info.component';

describe('AdditionalPatientInfoComponent', () => {
  let component: AdditionalPatientInfoComponent;
  let fixture: ComponentFixture<AdditionalPatientInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdditionalPatientInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdditionalPatientInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
