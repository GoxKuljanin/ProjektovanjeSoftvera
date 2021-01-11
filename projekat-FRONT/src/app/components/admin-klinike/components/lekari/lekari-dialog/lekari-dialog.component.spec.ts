import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LekariDialogComponent } from './lekari-dialog.component';

describe('LekariDialogComponent', () => {
  let component: LekariDialogComponent;
  let fixture: ComponentFixture<LekariDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LekariDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LekariDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
