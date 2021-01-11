import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProfilDialogComponent } from './edit-profil-dialog.component';

describe('EditProfilDialogComponent', () => {
  let component: EditProfilDialogComponent;
  let fixture: ComponentFixture<EditProfilDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditProfilDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProfilDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
