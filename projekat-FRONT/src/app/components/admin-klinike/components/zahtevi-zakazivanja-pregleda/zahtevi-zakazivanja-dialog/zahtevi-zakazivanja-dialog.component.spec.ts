import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZahteviZakazivanjaDialogComponent } from './zahtevi-zakazivanja-dialog.component';

describe('ZahteviZakazivanjaDialogComponent', () => {
  let component: ZahteviZakazivanjaDialogComponent;
  let fixture: ComponentFixture<ZahteviZakazivanjaDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZahteviZakazivanjaDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZahteviZakazivanjaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
