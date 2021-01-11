import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PacijentHomePageComponent } from './pacijent-home-page.component';

describe('PacijentHomePageComponent', () => {
  let component: PacijentHomePageComponent;
  let fixture: ComponentFixture<PacijentHomePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PacijentHomePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PacijentHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
