import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PregledaniPacijentComponent } from './pregledani-pacijent.component';

describe('PregledaniPacijentComponent', () => {
  let component: PregledaniPacijentComponent;
  let fixture: ComponentFixture<PregledaniPacijentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PregledaniPacijentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PregledaniPacijentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
