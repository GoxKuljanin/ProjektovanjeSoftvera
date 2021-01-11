import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OdbijZahtevDialogComponent } from './odbij-zahtev-dialog.component';

describe('OdbijZahtevDialogComponent', () => {
  let component: OdbijZahtevDialogComponent;
  let fixture: ComponentFixture<OdbijZahtevDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OdbijZahtevDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OdbijZahtevDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
