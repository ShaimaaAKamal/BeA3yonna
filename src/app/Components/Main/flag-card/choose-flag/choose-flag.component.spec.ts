import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseFlagComponent } from './choose-flag.component';

describe('ChooseFlagComponent', () => {
  let component: ChooseFlagComponent;
  let fixture: ComponentFixture<ChooseFlagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChooseFlagComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChooseFlagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
