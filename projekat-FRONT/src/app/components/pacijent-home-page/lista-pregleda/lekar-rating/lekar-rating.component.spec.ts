import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LekarRatingComponent } from './lekar-rating.component';

describe('LekarRatingComponent', () => {
  let component: LekarRatingComponent;
  let fixture: ComponentFixture<LekarRatingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LekarRatingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LekarRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
