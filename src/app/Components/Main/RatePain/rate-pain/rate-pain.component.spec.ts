import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RatePainComponent } from './rate-pain.component';

describe('RatePainComponent', () => {
  let component: RatePainComponent;
  let fixture: ComponentFixture<RatePainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RatePainComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RatePainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
