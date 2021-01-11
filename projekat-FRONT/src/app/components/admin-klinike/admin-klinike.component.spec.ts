import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminKlinikeComponent } from './admin-klinike.component';

describe('AdminKlinikeComponent', () => {
  let component: AdminKlinikeComponent;
  let fixture: ComponentFixture<AdminKlinikeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminKlinikeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminKlinikeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
