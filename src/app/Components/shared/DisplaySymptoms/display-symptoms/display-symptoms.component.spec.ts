import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplaySymptomsComponent } from './display-symptoms.component';

describe('DisplaySymptomsComponent', () => {
  let component: DisplaySymptomsComponent;
  let fixture: ComponentFixture<DisplaySymptomsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DisplaySymptomsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplaySymptomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
