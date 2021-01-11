import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AkEditPasswordDialogComponent } from './ak-edit-password-dialog.component';

describe('AkEditPasswordDialogComponent', () => {
  let component: AkEditPasswordDialogComponent;
  let fixture: ComponentFixture<AkEditPasswordDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AkEditPasswordDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AkEditPasswordDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
