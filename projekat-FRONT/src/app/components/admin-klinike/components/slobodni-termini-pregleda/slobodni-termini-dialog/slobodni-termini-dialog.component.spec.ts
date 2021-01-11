import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlobodniTerminiDialogComponent } from './slobodni-termini-dialog.component';

describe('SlobodniTerminiDialogComponent', () => {
  let component: SlobodniTerminiDialogComponent;
  let fixture: ComponentFixture<SlobodniTerminiDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlobodniTerminiDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlobodniTerminiDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
