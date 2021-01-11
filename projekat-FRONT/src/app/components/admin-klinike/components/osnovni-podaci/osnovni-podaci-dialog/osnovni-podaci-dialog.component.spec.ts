import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OsnovniPodaciDialogComponent } from './osnovni-podaci-dialog.component';

describe('OsnovniPodaciDialogComponent', () => {
  let component: OsnovniPodaciDialogComponent;
  let fixture: ComponentFixture<OsnovniPodaciDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OsnovniPodaciDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OsnovniPodaciDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
