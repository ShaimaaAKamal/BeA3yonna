import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseSymptomsComponent } from './choose-symptoms.component';

describe('ChooseSymptomsComponent', () => {
  let component: ChooseSymptomsComponent;
  let fixture: ComponentFixture<ChooseSymptomsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChooseSymptomsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChooseSymptomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
