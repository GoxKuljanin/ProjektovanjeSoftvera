import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KlinikaRatingComponent } from './klinika-rating.component';

describe('KlinikaRatingComponent', () => {
  let component: KlinikaRatingComponent;
  let fixture: ComponentFixture<KlinikaRatingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KlinikaRatingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KlinikaRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
