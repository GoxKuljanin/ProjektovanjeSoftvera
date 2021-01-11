import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlobodniTerminiPregledaComponent } from './slobodni-termini-pregleda.component';

describe('SlobodniTerminiPregledaComponent', () => {
  let component: SlobodniTerminiPregledaComponent;
  let fixture: ComponentFixture<SlobodniTerminiPregledaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlobodniTerminiPregledaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlobodniTerminiPregledaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
