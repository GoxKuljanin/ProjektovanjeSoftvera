import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoviPregledaDialogComponent } from './tipovi-pregleda-dialog.component';

describe('TipoviPregledaDialogComponent', () => {
  let component: TipoviPregledaDialogComponent;
  let fixture: ComponentFixture<TipoviPregledaDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoviPregledaDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoviPregledaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
