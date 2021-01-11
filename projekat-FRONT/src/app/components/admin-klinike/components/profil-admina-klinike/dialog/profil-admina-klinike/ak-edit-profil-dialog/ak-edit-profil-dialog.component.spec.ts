import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AkEditProfilDialogComponent } from './ak-edit-profil-dialog.component';

describe('AkEditProfilDialogComponent', () => {
  let component: AkEditProfilDialogComponent;
  let fixture: ComponentFixture<AkEditProfilDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AkEditProfilDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AkEditProfilDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
