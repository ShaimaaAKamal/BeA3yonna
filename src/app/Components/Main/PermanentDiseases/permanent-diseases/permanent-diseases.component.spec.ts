import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermanentDiseasesComponent } from './permanent-diseases.component';

describe('PermanentDiseasesComponent', () => {
  let component: PermanentDiseasesComponent;
  let fixture: ComponentFixture<PermanentDiseasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PermanentDiseasesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PermanentDiseasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
