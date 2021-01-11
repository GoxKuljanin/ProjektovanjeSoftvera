import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZakaziPregledDialogComponent } from './zakazi-pregled-dialog.component';

describe('ZakaziPregledDialogComponent', () => {
  let component: ZakaziPregledDialogComponent;
  let fixture: ComponentFixture<ZakaziPregledDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZakaziPregledDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZakaziPregledDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
