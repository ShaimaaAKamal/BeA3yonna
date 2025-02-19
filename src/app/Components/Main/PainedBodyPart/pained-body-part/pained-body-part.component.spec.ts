import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PainedBodyPartComponent } from './pained-body-part.component';

describe('PainedBodyPartComponent', () => {
  let component: PainedBodyPartComponent;
  let fixture: ComponentFixture<PainedBodyPartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PainedBodyPartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PainedBodyPartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
