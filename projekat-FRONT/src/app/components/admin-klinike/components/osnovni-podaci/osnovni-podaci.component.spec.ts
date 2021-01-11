import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OsnovniPodaciComponent } from './osnovni-podaci.component';

describe('OsnovniPodaciComponent', () => {
  let component: OsnovniPodaciComponent;
  let fixture: ComponentFixture<OsnovniPodaciComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OsnovniPodaciComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OsnovniPodaciComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
