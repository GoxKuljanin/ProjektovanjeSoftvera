import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminKlinickogCentraHomePageComponent } from './admin-klinickog-centra-home-page.component';

describe('AdminKlinickogCentraHomePageComponent', () => {
  let component: AdminKlinickogCentraHomePageComponent;
  let fixture: ComponentFixture<AdminKlinickogCentraHomePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminKlinickogCentraHomePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminKlinickogCentraHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
